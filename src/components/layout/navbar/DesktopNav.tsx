import { NavLink } from 'react-router-dom';
import navItems from '../../../lib/links';
import SearchNav from './SearchNav';

function DesktopNav() {
    return (
        <div className="hidden md:block">
            <div className="ml-8 flex items-center gap-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-md text-sm font-medium text-neutral-12 transition-colors hover:bg-green-500/20 ${isActive && 'text-green-500'}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
                <SearchNav />
            </div>
        </div>
    );
}
export default DesktopNav;
