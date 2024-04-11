import { classNames } from "@/components/shared/classNames"
import { Container } from "@/components/shared/container"
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import algoliasearch from 'algoliasearch/lite';
import { useRouter } from "next/router"
import { SupportCreatorButton } from "../general"


export function CreatorSearch({creatorData}: any) {

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const recipesIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_RECIPE_INDEX}`);
    const [ input, setInput ] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>({ recipes: [] });

    useEffect(() => {
      if (input.trim()) {
          handleSearch(input);
      }
    }, [input]);

    const handleSearch = async (query: any) => {
      try {
          const [ recipes ] = await Promise.all([
              recipesIndex.search(query, {
                filters: `owner_affiliate_code:"${creatorData.owner.affiliate_code}"` // Adding filter for owner_display_name
            })
          ]);
          setSearchResults({ recipes: recipes?.hits });
      } catch (error) {
          console.error("Algolia search error:", error);
      }
  };

      const renderSearchResults = () => {
          // Combine and limit results
          const combinedResults = [...searchResults.recipes.slice(0, 5)].slice(0, 5);

          if (combinedResults.length === 0) {
              return null;
          }

          return (
              <div className="absolute z-20 mt-16 w-[325px] md:w-[500px] bg-white shadow-lg border border-gray-200 rounded-3xl">
                  {combinedResults.map((result, index) => (
                      <Link key={index} href={`/${result.owner_affiliate_code}/${result.objectID}`} className="block px-4  text-gray-700 hover:bg-gray-100 rounded-3xl">
                          <div className="inline-flex space-x-2 items-center py-3">
                              <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(result.cover_image_url)}?alt=media`} alt={result.name} className="h-8 w-8 rounded-full object-cover"></img>
                              <span className="text-sm lg:text-base capitalize">{result.name}</span>
                          </div>
                      </Link>
                  ))}
              </div>
          );
      };

    return(
    <div className={"flex flex-col lg:flex-row"}>
        <div className="w-full flex-col">
            <dl className="grid grid-cols-1">
                <div className="flex flex-col items-center animate-fadeIn w-[300px] md:w-[500px]">
                    <div className="flex sm:flex-row flex-col">
                        <form action="" method="POST" className="py-1 pl-6 pr-6 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                        border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                            <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                            {/* ADD DYNAMIC USERNAME TO PLACEHOLDER */}
                            <input type="text" name="web-page" value={input} placeholder={`Search recipes from ${creatorData.display_name}`} className="text-left w-[225px] md:w-[400px] text-gray-500 py-3 outline-none bg-transparent capitalize" onChange={(e) => setInput(e.target.value)}/>
                            <XMarkIcon onClick={() => setInput('')} className={classNames(input ? `text-red-600 hover:text-red-500 cursor-pointer` : `text-gray-600  cursor-default hover:text-gray-800`, `h-6 w-6 `)}/>
                        </form>
                    </div>
                    {input && renderSearchResults()}
                </div>
            </dl>
        </div>
    </div>
    )
}

export function CreatorSocials({creatorData, setIsOpen}: any) {

    const navigation = {
        social: [
          {
            name: 'TikTok',
            href: `${creatorData?.socials?.tiktok?.link ? creatorData?.socials?.tiktok?.link : ''}`,
            icon: (props: any) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    {...props}
                    className="h-5 w-5">
                    <path
                        fill="currentColor"
                        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
            ),
          },
          {
            name: 'Instagram',
            href: `${creatorData?.socials?.instagram?.link ? creatorData?.socials?.instagram?.link : ''}`,
            icon: (props: any) => (
              <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            ),
          },
          {
            name: 'Twitter',
            href: `${creatorData?.socials?.twitter?.link ? creatorData.socials?.twitter?.link : ''}`,
            icon: (props: any) => (
              <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            ),
          },
          {
            name: 'YouTube',
            href: `${creatorData?.socials?.youtube?.link ? creatorData.socials?.youtube?.link : ''}`,
            icon: (props: any) => (
              <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                  fillRule="evenodd"
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                  clipRule="evenodd"
                />
              </svg>
            ),
          },
          {
            name: 'Website',
            href: `${creatorData?.socials?.website?.link ? creatorData.socials?.website?.link : ''}`,
            icon: (props: any) => (
              <svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"></path>
              </svg>
            ),
          },
        ],
    }

    const onLinkClick = (url: string | null) => {
      if (url?.startsWith('http://') || url?.startsWith('https://')) { window.open(url)}
      else { window.open(`https://${url}`) }
    }

    const router = useRouter()

    return(
        <Container className="relative flex justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full animate-fadeIn">
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-6">
                    {navigation.social.map((item) => (
                        <button key={item.name} onClick={ () => onLinkClick(item.href)} className={item.href !== '' ? `text-gray-500 hover:text-gray-600` : 'hidden'}>
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-7 w-7" aria-hidden="true" />
                        </button>
                    ))}
                    <SupportCreatorButton setIsOpen={setIsOpen} size={'small'}/>
                </div>
            </div>
        </Container>
    )
}
