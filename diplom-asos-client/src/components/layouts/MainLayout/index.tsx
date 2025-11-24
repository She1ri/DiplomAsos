import { Outlet, Link, useLocation } from "react-router-dom";

const MainLayout = () => {
    const location = useLocation();

    return (
        <>
            <nav className="bg-neutral-secondary-soft fixed w-full z-20 top-0 start-0 border-b border-default">
                <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-7"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
                            Flowbite
                        </span>
                    </Link>

                    <button
                        data-collapse-toggle="navbar-solid"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
                        aria-controls="navbar-solid"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                d="M5 7h14M5 12h14M5 17h14"
                            />
                        </svg>
                    </button>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-secondary-soft">

                            {/* Кнопка "Логін" лише на сторінці, якщо ми не на логін сторінці */}
                            {location.pathname !== "/login" && (
                                <li>
                                    <Link
                                        to="/login" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:hover:text-fg-brand md:p-0">Логін
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>

            {/* Контент з однаковими відступами */}
            <div className="max-w-screen-xl mx-auto px-4 mt-20">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
