'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { BoltIcon, CalendarDaysIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'



const Navigation: React.FC = () => {
  const navigation = [
      { name: 'Product', href: '#' },
      { name: 'Features', href: '#' },
      { name: 'Marketplace', href: '#' },
      { name: 'Company', href: '#' },
  ]

  const primaryFeatures = [
    {
      name: 'Easy Setup',
      description:
        'Easy to setup Vending Machine with our solution. Product is ready to use in minutes.',
      href: '#',
      icon: BoltIcon,
    },
    {
      name: 'Operate Anywhere',
      description:
        'Enjoy the flexibility of location with our mobile-friendly management system. Operate your vending machines from any location, at any time.',
      href: '#',
      icon: GlobeAltIcon,
    },
    {
      name: 'Task Scheduling',
      description:
        "Schedule restocking, maintenance, and more with an integrated calendar system designed for maximum efficiency and time management.",
      href: '#',
      icon: CalendarDaysIcon,
    },
  ]

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  return (
    <div className="flex flex-col h-full justify-between">
      <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                  <a href="#" className="-m-1.5 p-1.5">
                      <span className="sr-only">Vening machine</span>
                      <img
                          className="h-8 w-auto"
                          src="https://www.vectorlogo.zone/logos/redpoint/redpoint-icon.svg"
                          alt=""
                      />
                  </a>
              </div>
              <div className="flex lg:hidden">
                  <button
                      type="button"
                      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-tahiti-700"
                      onClick={() => setMobileMenuOpen(true)}
                  >
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                  </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                  {navigation.map((item) => (
                      <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-50">
                          {item.name}
                      </a>
                  ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                  <Link href="/machine" className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-50">
                      Vending Login
                  </Link>
                  <span>&nbsp; | &nbsp;</span>
                  <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-50">
                      &nbsp;Login <span aria-hidden="true">&rarr;</span>
                  </Link>
              </div>
          </nav>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <div className="fixed inset-0 z-50"/>
              <Dialog.Panel
                  className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                      <a href="#" className="-m-1.5 p-1.5">
                          <span className="sr-only">Vending Venture</span>
                          <img
                              className="h-8 w-auto"
                              src="https://www.vectorlogo.zone/logos/redpoint/redpoint-icon.svg"
                              alt=""
                          />
                      </a>
                      <button
                          type="button"
                          className="-m-2.5 rounded-md p-2.5 text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                      >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                      </button>
                  </div>
                  <div className="mt-6 flow-root">
                      <div className="-my-6 divide-y divide-gray-500/10">
                          <div className="space-y-2 py-6">
                              {navigation.map((item) => (
                                  <a
                                      key={item.name}
                                      href={item.href}
                                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                      {item.name}
                                  </a>
                              ))}
                          </div>
                          <div className="py-6">
                              <Link
                                  href="/machine"
                                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-slate-50"
                              >
                                  Vending Login
                              </Link>
                              <Link
                                  href="login"
                                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-slate-50"
                              >
                                  Login
                              </Link>
                          </div>
                      </div>
                  </div>
              </Dialog.Panel>
          </Dialog>
      </header>
      
      {/* Main content */}
      <div className="py-24 sm:py-32 lg:mt-32 sm:mt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-slate-100">
                  Vending Machines Solution for Your Business
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Vending Machine for your business. We provide the best solution for your business. Our vending machine is the best in the market.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                  <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-50">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
              </div>
            </div>
        </div>


        {/* Feature */}
        <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-56 lg:px-8 mb-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-50">One Stop Service</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-4xl">
              Everything you need to operate your vending machine
            </p>
            <p className="mt-6 text-lg leading-8  text-gray-600">
              Our vending machine provides everything you need to operate your vending machine. We provide the best solution for your business.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {primaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-50">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 ">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7  text-slate-500">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <a href={feature.href} className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-50">
                        Learn more <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
                              

      </div>
      
  );
};

export default Navigation;