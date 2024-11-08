// components/shared/GlobalModal.tsx
"use client";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { TbAlertTriangle, TbBook2, TbCircleCheck, TbUser } from "react-icons/tb";
import AdSense from '@/components/ads/adsense';
import { useRouter } from 'next/router';
import { useModal } from '@/context/modalcontext'

const statusIcons = {
  info: <TbBook2 className='text-primary-main h-10 w-10' aria-hidden="true" />,
  error: <TbAlertTriangle className='text-red-500 h-10 w-10' aria-hidden="true" />,
  success: <TbCircleCheck className='text-green-500 h-10 w-10' aria-hidden="true" />,
  warning: <TbAlertTriangle className='text-yellow-500 h-10 w-10' aria-hidden="true" />,
  auth: <TbUser className='text-primary-main h-10 w-10' aria-hidden="true" />,
};

const GlobalModal: React.FC = () => {

    const cancelButtonRef = useRef(null);
    const router = useRouter();
    const { isOpen, title, text, role, displayAd, status, recipeId, slug, source, closeModal } = useModal();

    const onButtonClick = () => {
        if (status !== 'info') {
            router.push(modalAction[status]);
        } 
        closeModal();
    };

    const modalAction = {
        info: "/",
        error: "/",
        success: "/my-recipes",
        warning: "/",
        auth: recipeId == `0` ? `/auth/login?redirect=/` : source == 'ai' ? `/auth/login?redirect=/ai-recipes/${recipeId?.toString()}/${slug}` : `/auth/login?redirect=/recipes/${recipeId?.toString()}/${slug}`,
    };

    const buttonText = {
        info: 'Okay',
        error: 'Return',
        success: 'My Recipes',
        warning: 'Return',
        auth: 'Login / Signup',
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={closeModal}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4 text-center w-screen">
                    <div className="flex min-h-screen items-center justify-center w-full">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 space-y-4">
                            <div>
                                <div className={` mx-auto flex h-12 w-12 items-center justify-center`}>
                                    {statusIcons[status]}
                                </div>
                                <div className="mt-1 text-center space-y-1">
                                    <Dialog.Title as="h3" className="text-xl lg:text-2xl font-semibold leading-6 text-gray-900 capitalize">
                                    {title}
                                    </Dialog.Title>
                                    <p className="text-sm lg:text-base text-gray-600">
                                        {text}
                                    </p>
 
                                </div>
                            </div>
                            {displayAd && role !== 'premium' && (
                                <AdSense className="mx-auto" adSlot="9250004753" adFormat="auto" adStyle={{ width: '100%', height: '250px' }}/> 
                            )}
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                onClick={onButtonClick}
                            >
                                { buttonText[status] }
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                onClick={closeModal}
                                ref={cancelButtonRef}
                            >
                                Return
                            </button>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default GlobalModal;
