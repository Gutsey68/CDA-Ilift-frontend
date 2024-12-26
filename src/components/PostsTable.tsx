import { useInfiniteQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, OnChangeFn, SortingState, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchPosts } from '../services/postsService';
import { PostType } from '../types/postsType';

const FETCH_SIZE = 50;

const PostsTable = () => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<PostType>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100
      },
      {
        accessorKey: 'content',
        header: 'Contenu',
        size: 300,
        cell: info => <div className="max-w-xs truncate">{info.getValue<string>()}</div>
      },
      {
        accessorKey: 'author.pseudo',
        id: 'author.pseudo', // Changer l'id pour correspondre au chemin complet
        header: 'Auteur',
        size: 150
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        size: 120,
        cell: info => new Date(info.getValue<string>()).toLocaleDateString('fr-FR')
      },
      {
        accessorKey: 'isValid',
        header: 'Statut',
        size: 100,
        cell: info => (
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold ${info.getValue() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {info.getValue() ? 'Valide' : 'Non valide'}
          </span>
        )
      }
    ],
    []
  );

  const { data, fetchNextPage, isFetching, isLoading, error } = useInfiniteQuery({
    queryKey: ['postsAdmin', sorting],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await fetchPosts((pageParam - 1) * FETCH_SIZE, FETCH_SIZE, sorting);
        return response;
      } catch (error) {
        console.error('Erreur lors du chargement des posts:', error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data?.length) return undefined;
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.meta.totalRowCount / FETCH_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    },
    refetchOnWindowFocus: false
  });

  console.log('Response structure:', data?.pages?.[0]);

  const flatData = useMemo(() => data?.pages?.flatMap(page => page.data) ?? [], [data]);

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const handleSortingChange: OnChangeFn<SortingState> = updater => {
    setSorting(updater);
    // Attendre le prochain tick pour s'assurer que le virtualizer est initialisé
    setTimeout(() => {
      if (rowVirtualizer?.scrollToIndex && tableContainerRef.current) {
        try {
          rowVirtualizer.scrollToIndex(0, {
            align: 'start',
            behavior: 'smooth'
          });
        } catch (error) {
          console.error('Erreur lors du scroll:', error);
          // Fallback : scroll manuel si le virtualizer échoue
          tableContainerRef.current.scrollTop = 0;
        }
      } else {
        // Fallback si le virtualizer n'est pas disponible
        tableContainerRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 0);
  };

  const table = useReactTable({
    data: flatData,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 45,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? element => element?.getBoundingClientRect().height ?? 45 : undefined,
    overscan: 5,
    scrollToFn: (offset, { behavior }) => {
      tableContainerRef.current?.scrollTo({
        top: offset,
        behavior: behavior as ScrollBehavior
      });
    }
  });

  // Ajouter la gestion des erreurs dans le rendu
  if (error) return <div>Erreur lors du chargement des données: {error.message}</div>;
  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="mb-4">
        {totalFetched} sur {totalDBRowCount} lignes chargées
      </div>
      <div
        ref={tableContainerRef}
        className="rounded-lg border border-gray-200"
        onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        style={{
          overflow: 'auto',
          position: 'relative',
          height: '600px'
        }}
      >
        <table className="min-w-full" style={{ display: 'grid' }}>
          <thead
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'white'
            }}
          >
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      display: 'flex',
                      width: header.getSize()
                    }}
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    <div className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''} onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' ↑',
                        desc: ' ↓'
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative'
            }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  ref={node => rowVirtualizer.measureElement(node)}
                  data-index={virtualRow.index}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%'
                  }}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      style={{
                        display: 'flex',
                        width: cell.column.getSize()
                      }}
                      className="whitespace-nowrap px-6 py-4 text-sm"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
            {isFetching && <div className="mt-4">Chargement des données supplémentaires...</div>}
          </tbody>
        </table>
      </div>
      {isFetching && <div className="mt-4">Chargement des données supplémentaires...</div>}
    </div>
  );
};

export default PostsTable;
