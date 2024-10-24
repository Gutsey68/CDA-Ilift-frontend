import ProfileCard from '../components/profile/ProfileCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';

function Profil() {
    return (
        <div className="mx-auto flex w-full max-w-6xl gap-6">
            <div className="flex w-2/3 flex-col rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2">
                <ProfileCard />
                <div className="flex items-center justify-center text-center text-neutral-11">
                    <div className="w-1/3 cursor-pointer border-b border-neutral-6 py-2 hover:border-green-9">Publications</div>
                    <div className="w-1/3 cursor-pointer border-b border-neutral-6 py-2 hover:border-green-9">J'aime</div>
                    <div className="w-1/3 cursor-pointer border-b border-neutral-6 py-2 hover:border-green-9">Partages</div>
                </div>
            </div>
            <div className="w-1/3">
                <SuggestedProfils />
            </div>
        </div>
    );
}
export default Profil;