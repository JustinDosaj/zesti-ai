import { Container } from "@/components/shared/container";
import { Button } from "@/components/shared/button";
import { EnvelopeIcon, UsersIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SendContactRequest } from "../api/firebase/functions";
import Head from 'next/head';
import { Title } from "@/components/shared/title";
import { Paragraph } from "@/components/shared/paragraph";
import { useState } from "react";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user_id = null; // Replace with actual user ID if available
      await SendContactRequest(message, user_id, email);
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send contact request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Zesti AI | Get in Touch for Support & Inquiries</title>
        <meta name="title" content="Zesti AI | Get in Touch for Support & Inquiries" />
        <meta name="description" content="Have questions or need assistance? Reach out to the Zesti support team through our contact page. We are here to help with all your recipe conversion needs!" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-background h-screen w-full">
        <Container className={"grid md:grid-cols-1 lg:flex-row gap-10 lg:gap-12 mb-36"}>
          <div className="flex-1 flex flex-col text-center mt-14">
            <Title>Contact Us</Title>
            <Paragraph className="mt-2">If you have any questions or require support, send us a message and we will respond as soon as possible!</Paragraph>
          </div>
          <form onSubmit={submitForm} className="mx-auto w-full sm:w-[550px]">
            <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
              <span className="min-w-max pr-2 border-r border-box-border">
                <UsersIcon className="h-6 w-6 text-black" />
              </span>
              <input
                type="text"
                required
                name="FULLNAME"
                placeholder="Name"
                className="w-full py-3 outline-none bg-transparent text-gray-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
              <span className="min-w-max pr-2 border-r border-box-border">
                <EnvelopeIcon className="h-6 w-6 text-black" />
              </span>
              <input
                type="email"
                required
                name="EMAIL"
                placeholder="Email"
                className="w-full py-3 outline-none bg-transparent text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-3xl ease-linear focus-within:bg-body focus-within:border-primary">
              <textarea
                name="MSG"
                required
                placeholder="Message..."
                className="w-full py-3 outline-none bg-transparent text-gray-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4 py-1 w-full pr-1 gap-3 items-center text-heading">
              <Button isLink={false} buttonType="submit" text="" className={"min-w-max text-white"} isDisabled={loading}>
                <span className="hidden sm:flex relative z-[5]">
                  {loading ? "Sending..." : "Submit"}
                </span>
                <span className="flex sm:hidden relative z-[5]">
                  <PaperAirplaneIcon className="h-6 w-6 text-white" />
                </span>
              </Button>
            </div>
          </form>
        </Container>
      </main>
    </>
  );
}
