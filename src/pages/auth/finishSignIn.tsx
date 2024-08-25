import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { LoginLoader } from "@/components/shared/loader";
import { Title } from "@/components/shared/title";
import { Container } from "@/components/shared/container";

export default function FinishSignIn() {
  
  const { finishSignIn } = useAuth(); // Use finishSignIn from context
  const router = useRouter();

 useEffect(() => {
    finishSignIn().then(() => {
      router.push("/");
    });
  }, [finishSignIn, router]);

  return (
    <>
      <Head>
        <title>Signing into Zesti AI</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={`main-seo-page-class`}>
        <Container className="my-auto mt-12">
            <Title className="text-center">Signing In...</Title>
            <LoginLoader/>
        </Container>
      </main>
    </>
  );
}
