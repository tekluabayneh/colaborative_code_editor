'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
const NarBar = () => {
const route = useRouter();
return (
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="text-white font-semibold text-lg">
                🖤 CodeSync 
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Product</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Resources</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Docs</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              </nav>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors"
                onClick={() => route.push('/Auth')}
                        >
                Sign in
              </button>
              <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                Book a demo
              </button>
            </div>
          </div>
        </div>
      </header>

    )

}

export default NarBar;
