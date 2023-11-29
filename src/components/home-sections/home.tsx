import { BtnLink } from "../shared/btnlink";
import { Container } from "../shared/container";

export function TryPremiumCTA() {
    return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="bg-white border rounded-xl w-full">
            <div className="px-6 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get the most out of Zesti
                <br />
                Get Premium 7 Days Free
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-700">
                Join hundreds of users cooking fresh meals at home and try Zesti premium free for 7 days.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <BtnLink className="" text="Try Premium Free" href="/pricing"/>
                </div>
            </div>
            </div>
        </div>
        </Container>
    )
  }