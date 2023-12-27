import { Container } from "../shared/container"

export function CreatorRecentVideosTitle() {
    return(
    <Container className="relative sm:flex justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full animate-fadeIn">
        <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Recently Uploaded Videos</h3>
    </Container>
    )
}