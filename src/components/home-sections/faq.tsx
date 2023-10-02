import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { Container } from '../shared/container'
import { Title } from '../shared/title'

const faqs = [
  {
    question: "How does Webnest work?",
    answer: "Webnest utilizes artifical intelligence (AI) to generate optimized keywords and phrases to increase traffic and conversions. The AI scans your web page to identify similar web pages and generates predictive and historical effective keywords.",
  },
  {
    question: "How do you train AI?",
    answer: "It is important that we consistantly train our fine-tuned model to constantly improve the effectiveness of responses. We train our model in two ways; We compile data from various sources that show how effect certain keywords and we feed that data to our fine-tuned gpt AI model, Users have the option to rate responses based on effectiveness to help the model learn.",
  },
  {
    question: "Is Webnest free?",
    answer: "We offer a few free tokens so you can test out the platform before committing to anything. After that, there will be a subcription fee of $9.99/Month that can be canceled anytime",
  },
  {
    question: "What languages are supported?",
    answer: "Currently only english is available and we have no plans to add any other languages at this time.",
  },
  {
    question: "I have more questions, how can I contact you?",
    answer: "You can visit the conatct page and send us a message!",
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
