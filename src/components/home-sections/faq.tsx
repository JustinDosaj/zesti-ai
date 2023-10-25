import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { Container } from '../shared/container'
import { Title } from '../shared/title'

const faqs = [
  {
    question: "How does Zesti work?",
    answer: "Zesti utilizes artifical intelligence (AI) to transcribe a video into something our specially trainer openai model can understand, allowing us to show you a full recipe with only a link.",
  },
  {
    question: "What are the video requirements for Zesti?",
    answer: "Videos can be 10 to 20 minutes long depending on your subscription. For best results, ensure that the video has verbal instructions. Ideally, select a video that directly states measurements (ie. 1/4 cup of water)",
  },
  {
    question: "Does Zesti only work with Youtube videos?",
    answer: "Yes, though we are actively working on integrating support for Tiktok, Vimeo, Twitch.tv and more! ",
  },
  {
    question: "Is Zesti free?",
    answer: "We offer enough tokens for you to get a recipe from 1 video up to 10 minutes long. After that, Zesti moves to a subscription model.",
  },
  {
    question: "I have more questions, how can I contact you?",
    answer: "You can visit the contact page and send us a message!",
  },
  // More questions...
]

export function FAQ() {
  return (
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <Title className="text-center">Frequently asked questions</Title>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </Container>
  )
}
