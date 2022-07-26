import LinksManager from "../components/LinksManager";
import UserManager from "../components/UserManager";

const Admin = () => {
    return (
        <div className={'flex justify-between px-10'}>
            <div className="w-full h-fit">
                <label className="text-3xl">{`Links:`}</label>
                <div className={'h-full border-4 mr-5 box-border p-5'}>
                    <LinksManager />
                </div>
            </div>
            <div className="w-full h-fit">
                <label className="text-3xl">{`Users:`}</label>
                <div className={'h-full border-4 mr-5 box-border p-5'}>
                    <UserManager />
                </div>
            </div>
        </div>
    );
};

export default Admin;