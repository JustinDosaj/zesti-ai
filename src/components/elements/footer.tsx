"use client;"

import { Raleway } from 'next/font/google'
import { TbBrandTiktok, TbBrandInstagram, TbBrandX,TbBrandYoutube } from "react-icons/tb";
import Link from "next/link"

const raleway = Raleway({subsets: ['latin']})

const navigation = {
    main: [
      { name: 'Pricing', href: '/about/pricing' },
      { name: 'Contact', href: '/about/contact' },
      { name: 'FAQ', href: '/about/faq' },
      { name: 'Explore', href: '/explore'},
      { name: 'Privacy', href: '/about/policy/privacy-policy' },
      { name: 'Terms', href: '/about/policy/terms-and-conditions' },
    ],
    social: [
        {
          name: 'Instagram',
          href: 'https://www.instagram.com/zestidotai/',
          icon: TbBrandInstagram 
        },
        {
          name: 'X',
          href: 'https://twitter.com/zestidotai',
          icon: TbBrandX
        },
        {
          name: 'TikTok',
          href: 'https://www.tiktok.com/@zestidotai',
          icon: TbBrandTiktok
        },
        {
          name: 'YouTube',
          href: 'https://www.youtube.com/@Zestidotai',
          icon: TbBrandYoutube
        },
      ],
  }
  
  export function Footer() {

    var year = new Date().getFullYear()

    return (
      <footer className={`bg-gray-200 ${raleway}`}>
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
            <nav className="-mb-6 columns-3 text-center sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
              {navigation.main.map((item) => (
                <div key={item.name} className="pb-6">
                  <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          <div className="mt-10 flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <button key={item.name} onClick={() => window.open(item.href)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </button>
            ))}
          </div>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            &copy; {year} Vurge LLC. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }
  