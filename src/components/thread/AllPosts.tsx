import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Earth, Ellipsis, Heart, LoaderCircle, MessageCircle, Repeat } from 'lucide-react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { like, unLike } from '../../services/likesService';
import { sharePost, unsharePost } from '../../services/sharesService';
import { PostType } from '../../types/postsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import ConfirmShareModal from '../modals/ConfirmShareModal';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import CommentsModal from './CommentsModal';
import EditPostModal from './EditPostModal';

type AllPostsProps = {
  posts: PostType[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

function AllPosts({ posts, fetchNextPage, hasNextPage, isFetchingNextPage }: AllPostsProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [postToEdit, setPostToEdit] = useState<PostType | null>(null);
  const [postToShare, setPostToShare] = useState<PostType | null>(null);
  const [postToUnshare, setPostToUnshare] = useState<PostType | null>(null);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const userId = user?.id;

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }

  const likeMutation = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', userId] });
      queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', userId] });
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: (id: string) => unLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', userId] });
      queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', userId] });
    }
  });

  const shareMutation = useMutation({
    mutationFn: (id: string) => sharePost(id),
    onSuccess: () => {
      toast.success('Post republié avec succès');
      queryClient.invalidateQueries({ queryKey: ['posts', userId] });
      queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', userId] });
    },
    onError: () => {
      toast.error('Erreur lors de la republication du post');
    }
  });

  const unshareMutation = useMutation({
    mutationFn: (id: string) => unsharePost(id),
    onSuccess: () => {
      toast.success('Republication supprimée avec succès');
      queryClient.invalidateQueries({ queryKey: ['posts', userId] });
      queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', userId] });
    },
    onError: () => {
      toast.error('Erreur lors de la suppression de la republication');
    }
  });

  const handleLike = (posts: PostType) => {
    if (posts.doILike) {
      unlikeMutation.mutate(posts.id);
    }

    if (!posts.doILike) {
      likeMutation.mutate(posts.id);
    }
  };

  const handleShareClick = (post: PostType) => {
    if (post.isShared && post.sharedBy === userId) {
      setPostToUnshare(post);
    } else {
      setPostToShare(post);
    }
  };

  const handleConfirmShare = () => {
    if (postToShare) {
      shareMutation.mutate(postToShare.id);
      setPostToShare(null);
    }
  };

  const handleConfirmUnshare = () => {
    if (postToUnshare) {
      unshareMutation.mutate(postToUnshare.id);
      setPostToUnshare(null);
    }
  };

  return (
    <>
      {posts.map((post: PostType) => {
        const user = post.author;

        return (
          <Card size="xs" key={post.id + Date.now()} className="mt-4 flex flex-col gap-4">
            {post.isShared && (
              <>
                <div className="flex flex-col gap-1 px-4 pt-4 text-neutral-11">
                  <div className="flex items-center gap-2 text-sm ">
                    <Repeat size={16} />
                    <span>{post.sharedBy === userId ? 'Vous avez' : `${post.sharedByUser?.pseudo} a`} republié</span>
                  </div>
                  <div className="ml-7 flex items-center gap-1 text-xs text-neutral-10">
                    <p>{post.sharedAt ? formatRelativeTime(post.sharedAt) : ''} • </p>
                    <Earth size={14} />
                  </div>
                </div>
                <hr className="border-neutral-6" />
              </>
            )}
            <div className="flex justify-between px-2 pt-4">
              <div className="flex gap-4">
                <Avatar alt="" size="sm" src={user.profilePhoto ?? ''} />
                <div className="flex flex-col">
                  <p className="font-semibold text-neutral-12">{user?.pseudo}</p>
                  <div className="flex items-center gap-1 text-xs text-neutral-11">
                    <p>{formatRelativeTime(post.createdAt)} • </p>
                    <Earth size={14} />
                  </div>
                </div>
              </div>
              {post.isMyPost && (
                <button onClick={() => setPostToEdit(post)} className="text-neutral-11 hover:text-green-9">
                  <Ellipsis size={16} />
                </button>
              )}
            </div>
            <div className="mx-auto flex w-11/12 flex-col sm:w-3/4">
              <p className="text-neutral-11 max-sm:text-sm">{post.content}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag.tag.id}>{tag.tag.name}</Badge>
                  ))}
                </div>
              )}
            </div>
            {post.photo && <img className="mx-auto w-11/12 rounded-lg sm:w-3/4" src={post.photo} alt={`Photo de ${post.author.pseudo}`} />}
            <div>
              <div className="mx-auto flex w-11/12 items-center gap-4 border-b border-neutral-6 pb-2 text-xs text-neutral-11 sm:w-3/4">
                <div className="flex items-center gap-1">
                  <Heart size={14} />
                  <p>{post._count?.likes}</p>
                </div>
                <div onClick={() => setSelectedPostId(post.id)} className="flex cursor-pointer items-center gap-1 hover:text-green-11">
                  <MessageCircle size={14} />
                  <p>{post._count?.comments} commentaires</p>
                </div>
              </div>
              <div className="mx-auto flex w-11/12 justify-between pb-4 pt-2 sm:w-3/4">
                <button onClick={() => handleLike(post)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                  <Heart size={16} />
                  {post.doILike ? <span className="text-sm max-sm:text-xs">Je n'aime plus</span> : <span className="text-sm max-sm:text-xs">J'aime</span>}
                </button>
                <button onClick={() => setSelectedPostId(post.id)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                  <MessageCircle size={16} />
                  <span className="text-sm max-sm:text-xs">Commenter</span>
                </button>
                <button onClick={() => handleShareClick(post)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                  <Repeat size={16} />
                  <span className="text-sm max-sm:text-xs">{post.isShared && post.sharedBy === userId ? 'Ne plus republier' : 'Republier'}</span>
                </button>
              </div>
            </div>
          </Card>
        );
      })}
      {selectedPostId && <CommentsModal postId={selectedPostId} closeModal={() => setSelectedPostId(null)} />}
      {postToEdit && <EditPostModal post={postToEdit} closeModal={() => setPostToEdit(null)} />}
      {postToShare && <ConfirmShareModal onClose={() => setPostToShare(null)} onConfirm={handleConfirmShare} isLoading={shareMutation.isPending} />}
      {postToUnshare && (
        <ConfirmDeleteModal
          onClose={() => setPostToUnshare(null)}
          onConfirm={handleConfirmUnshare}
          isLoading={unshareMutation.isPending}
          title="Supprimer la republication"
          message="Voulez-vous vraiment supprimer cette republication ?"
        />
      )}
      {isFetchingNextPage && <LoaderCircle className="m-auto mt-4 w-fit animate-spin text-neutral-11" size={30} />}
    </>
  );
}

export default AllPosts;
