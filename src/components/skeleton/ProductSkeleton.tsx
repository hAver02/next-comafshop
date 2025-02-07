export default function  ProductSkeleton () {
    return (
      <div className="flex mt-2 rounded-xl bg-gray-300  w-[250px] h-[280px] flex-col justify-center px-4 items-center shadow-md shadow-white py-1 animate-pulse">
        <div className="h-[170px] w-[200px] bg-gray-400" />
        <p className="w-3/4 h-4 bg-gray-400 mt-2"></p>
        <div className="w-full flex items-center justify-between mt-2">
          <span className="w-1/2 h-6 bg-gray-400"></span>
          <span className="w-1/4 h-6 bg-gray-400"></span>
        </div>
        <div className="w-1/2 h-8 bg-gray-400 mt-4"></div>
      </div>
    );
  };