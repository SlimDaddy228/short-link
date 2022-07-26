import { CircularProgress } from "@mui/material";

const CircleLoader = () => {
    return (
        <div className={`flex justify-center items-center`} style={{ height: window.innerHeight }}>
            <div className='flex'>
                <CircularProgress />
            </div>
        </div>
    );
};

export default CircleLoader;