

type Props ={
    title: string;
    onLogOut: ()=> void;
}
export default function NavigationHeader({title, onLogOut}:Props){
    return(
    <div className="fixed top-0 z-50 w-full flex justify-between items-center p-2">
        
        <p
        className="text-xl font-bold text-blue-500 uppercase">{title}</p>
        <button className="aspect-square rounded-full bg-blue-500 w-11" onClick={onLogOut}>

        </button>
    </div>)
}