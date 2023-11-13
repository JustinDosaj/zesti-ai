import { Paragraph } from "../shared/paragraph"
import { Button } from "../shared/button"
import { Container } from "../shared/container"
import { useState } from 'react'
import { InputResponseModal } from "../shared/modals"

export function LinkInput({user, stripeRole}: any) {

    return(
    <section className="relative pt-32">
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
            <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
            <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight
                font-bold text-heading-1 text-black">
                Your Dashboard
                </h1>
                <Paragraph className="mt-8 text-gray-600">
                     Access your recipes or use Zesti to come up with new ideas and convert cooking videos into easy-to-follow recipes
                </Paragraph>
            </div>
        </Container>
    </section>
    )
}