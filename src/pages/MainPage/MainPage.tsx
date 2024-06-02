import React from "react";
import { Box, Flex, Text, Image, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <Box as="main" position="relative" w="100%">
      <Flex direction="column">
        <Flex>
          <Flex
            direction="column"
            justify="center"
            align="center"
            gap={["5px", "15px", "20px"]}
            w="30%"
            flexGrow="1"
            bg="#826F66"
            color="white"
            fontSize={["s", "s", "xl"]}
          >
            <Link to="/">
              <Text
                transition="0.3s"
                borderBottom="2px solid transparent"
                _hover={{ borderColor: " white" }}
              >
                Main Page
              </Text>
            </Link>
            <Link to="/signin">
              <Text
                transition="0.3s"
                borderBottom="2px solid transparent"
                _hover={{ borderColor: " white" }}
              >
                Sign In
              </Text>
            </Link>
            <Link to="/signup">
              <Text
                transition="0.3s"
                borderBottom="2px solid transparent"
                _hover={{ borderColor: " white" }}
              >
                Sign Up
              </Text>
            </Link>
            <Image
              boxSize={["50px", "70px", "100px"]}
              mt={["10px", "10px", "50px", "80px"]}
              src="images\pictures\shop-icon.svg"
              alt="icon"
            />
          </Flex>
          <Image
            w="70%"
            flexGrow="1"
            src="images\pictures\plates-1.jpg"
            objectFit="cover"
            alt=" "
          />
        </Flex>
        <Flex direction="column" align="center" p="60px" bg="#F9F2EC" px="10%">
          <Heading
            mb="10px"
            textAlign="center"
            fontSize={["2xl", "3xl", "3xl", "4xl"]}
          >
            From Mondays to birthdays,
          </Heading>
          <Text fontSize="xl" textAlign="center">
            your table is where you nourish yourself, your friendships, and your
            family. That’s why we believe it’s worth it to set a table you love.
          </Text>
        </Flex>
        <Flex direction={["column", "column", "row"]}>
          <Image
            flexGrow="1"
            boxSize={["100%", "100%", "50%"]}
            src="images\pictures\plates-2.jpg"
            objectFit="cover"
            alt=" "
          />
          <Flex
            flexGrow="1"
            direction="column"
            align="center"
            justify="center"
            px="7%"
            my="20px"
          >
            <Heading
              mb="20px"
              textAlign="center"
              fontSize={["2xl", "3xl", "2xl", "4xl"]}
            >
              We make this easy
            </Heading>
            <Text
              fontSize="lg"
              textAlign="center"
              color="gray.600"
              lineHeight="1.8"
            >
              Forget weekends spent schlepping to home goods stores, overwhelmed
              by quantities, underwhelmed by design, and dodging registry guns.
              We reinvented the tedious process of finding and styling
              top-quality table settings. You can shop à la carte or Build a
              Complete Set in a few clicks.
            </Text>
          </Flex>
        </Flex>
        <Flex direction={["column-reverse", "column-reverse", "row"]}>
          <Flex
            flexGrow="1"
            direction="column"
            align="center"
            justify="center"
            px="7%"
            my="20px"
          >
            <Heading
              mb="20px"
              textAlign="center"
              fontSize={["2xl", "3xl", "2xl", "4xl"]}
            >
              Beauty meets utility
            </Heading>
            <Text
              fontSize="lg"
              textAlign="center"
              color="gray.600"
              lineHeight="1.8"
            >
              We studied the shelves of people like you to learn what you
              actually use and love. Every detail of our assortment is designed
              for your modern life. You’ll love our elegant silhouettes and chic
              semi-matte glazes on your open shelving, in your effortless
              tablescapes, and throughout your daily dishwasher loads.
            </Text>
          </Flex>
          <Image
            flexGrow="1"
            boxSize={["100%", "100%", "50%"]}
            src="images\pictures\plates-3.jpg"
            objectFit="cover"
            alt=" "
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default MainPage;
