import { Container } from "@/components/shared/container"
import { MinusSmallIcon, PlusSmallIcon} from "@heroicons/react/20/solid"
import { Disclosure } from "@headlessui/react"
import { Title } from "@/components/shared/title"
import { Paragraph } from "@/components/shared/paragraph"


interface FAQProps {
    type: 'user',
    title?: string,
    desc?: string,
    qA?: any,
}

export function FAQ({title, desc, qA}: FAQProps) {

    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
      <div className="bg-white w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <div className="flex flex-col items-center text-center">
              <Title>{title}</Title>
              <Paragraph className="mt-2"></Paragraph>
            </div>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {qA.map((faq: any) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-700">
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