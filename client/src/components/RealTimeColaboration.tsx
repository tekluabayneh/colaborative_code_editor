const RealTimeCollaboration = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-8 flex items-center rounded-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Real-time collaboration.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Edit code and see updates while collaborating with other users in real-time.
          </p>
        </div>

        {/* Right side - Code editor mockup */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-white px-4 py-3 flex items-center gap-2">
            <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-900 font-medium">Interview with Jon</span>
          </div>

          {/* Code content */}
          <div className="bg-gray-900 p-4 font-mono text-sm">
            <div className="flex">
              {/* Line numbers */}
              <div className="text-gray-500 select-none mr-4 text-right">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
                <div>12</div>
              </div>

              {/* Code */}
              <div className="flex-1 relative">
                <div>
                  <span className="text-purple-400">import</span>
                  <span className="text-white"> {"("} </span>
                  <span className="text-green-400">useState</span>
                  <span className="text-white"> {")"} </span>
                  <span className="text-purple-400">from</span>
                  <span className="text-orange-400"> "react"</span>
                  <span className="text-white">;</span>
                </div>
                
                <div className="mt-1"></div>
                
                <div>
                  <span className="text-purple-400">export</span>
                  <span className="text-white"> </span>
                  <span className="text-purple-400">default</span>
                  <span className="text-white"> </span>
                  <span className="text-purple-400">function</span>
                  <span className="text-white"> </span>
                  <span className="text-yellow-400">MyApp</span>
                  <span className="text-white">{"()"} {"{"}</span>
                </div>
                
                <div className="ml-4 mt-1">
                  <span className="text-purple-400">return</span>
                  <span className="text-white"> {"("}</span>
                </div>
                
                <div className="ml-8 mt-1">
                  <span className="text-white">{"<"}</span>
                  <span className="text-red-400">div</span>
                  <span className="text-white">{">"}</span>
                </div>
                
                <div className="ml-12 mt-1 flex items-center">
                  <span className="text-white">{"<"}</span>
                  <span className="text-red-400">h1</span>
                  <span className="text-white">{">"}</span>
                  <span className="text-white">Counter: </span>
                  <span className="bg-pink-500 text-white px-1 rounded text-xs relative">
                    Sophie
                  </span>
                  <span className="text-white">update separately{"</"}</span>
                  <span className="text-red-400">h1</span>
                  <span className="text-white">{">"}</span>
                </div>
                
                <div className="ml-12 mt-1">
                  <span className="text-white">{"<"}</span>
                  <span className="text-red-400">MyButton</span>
                  <span className="text-white"> {"/>"}</span>
                </div>
                
                <div className="ml-12 mt-1">
                  <span className="text-white">{"<"}</span>
                  <span className="text-red-400">MyButton</span>
                  <span className="text-white"> {"/>"}</span>
                </div>
                
                <div className="ml-8 mt-1">
                  <span className="text-white">{"</"}</span>
                  <span className="text-red-400">div</span>
                  <span className="text-white">{">"}</span>
                </div>
                
                <div className="ml-4 mt-1">
                  <span className="text-white">{");"}</span>
                </div>
                
                <div className="mt-1">
                  <span className="text-white">{"}"}</span>
                </div>

                {/* Jon's cursor indicator */}
                <div className="absolute top-0 left-0 bg-green-500 text-white px-1 rounded text-xs">
                  Jon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;
