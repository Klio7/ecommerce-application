import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <Container>
            <Flex flexDirection="column">
                <Link to="/">Main Page</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </Flex>
        </Container>
    )
}

export default MainPage;