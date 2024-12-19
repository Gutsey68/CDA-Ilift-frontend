import { Plus } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import BreadCrumb from '../components/layout/BreadCrumb';
import CreateProgramModal from '../components/programs/CreateProgramModal';
import ProgramsList from '../components/programs/ProgramsList';
import ProgramsSkeletons from '../components/skeletons/ProgramsSkeletons';
import Button from '../components/ui/Button';
import { Spacing } from '../components/ui/Spacing';
import useProgramsOfUser from '../hooks/useProgramsOfUsers';

function ProgramsPage() {
  const { programsPending, programsData } = useProgramsOfUser();
  const [showModal, setShowModal] = useState(false);

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Programmes', current: true }
  ];

  return (
    <>
      <div className="mt-4 min-h-96">
        <div className="mx-auto mb-4 flex w-full max-w-6xl justify-start">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl">Mes programmes</h1>
            <Button onClick={() => setShowModal(true)} className="max-sm:px-2">
              <Plus className="sm:hidden" />
              <span className="max-sm:hidden">Créer un programme</span>
            </Button>
          </div>
          {programsData && programsData.length === 0 && <hr className="border-neutral-6" />}
          {programsPending ? <ProgramsSkeletons /> : <ProgramsList programs={programsData} />}
        </div>
      </div>
      {showModal && createPortal(<CreateProgramModal closeModal={() => setShowModal(false)} />, document.body)}
      <Spacing size="xl" />
    </>
  );
}
export default ProgramsPage;
