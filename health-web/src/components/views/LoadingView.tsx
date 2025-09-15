export default function LoadingView() {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-top pt-24 backdrop-blur-xl">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-surface-a50 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-primary-a50 rounded-full"></div>
        </div>
      </div>
    );
  }