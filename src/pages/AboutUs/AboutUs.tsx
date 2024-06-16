import React from 'react';
import { Box, Text, Image, Link, SimpleGrid, Heading, VStack } from '@chakra-ui/react';

const teamMembers = [
  {
    name: "Anna Odintsova",
    role: "Web Developer & Influencer",
    bio: "Anna is adept at identifying discrepancies between tasks and final outcomes. She excels in organizing workflows and ensuring timely completion of tasks. She proposed the project idea, provided the initial design layout, and contributed high-quality code.",
    github: "https://github.com/Klio7",
    photo: "images/pictures/photo/Anna.jpg",
    contributions: [
      "Proposed the project idea",
      "Provided initial design layout",
      "Contributed high-quality code"
    ]
  },
  {
    name: "Nikolai Kaliganov",
    role: "Web Developer & Crisis Manager",
    bio: "Nikolai has extensive knowledge in various technical domains including TypeScript, RESTful API, and project configuration. He quickly mastered React and played a crucial role in solving unexpected issues efficiently.",
    github: "https://github.com/kaliganoff",
    photo: "images/pictures/photo/Nikolai.jpg",
    contributions: [
      "Resolved build issues in Netlify",
      "Solved path problems",
      "Handled crisis management effectively"
    ]
  },
  {
    name: "Aleksei Arkhangelskii",
    role: "Web Developer & Tech Lead",
    bio: "Aleksey is a React expert and excels in building robust codebases. He provided significant technical assistance in API communication, coding in React, and solving data parsing issues.",
    github: "https://github.com/AlexeyArhangelskiy",
    photo: "images/pictures/photo/Aleksei.jpg",
    contributions: [
      "Implemented API communication",
      "Provided coding support in React",
      "Solved data parsing issues"
    ]
  }
];

const rsSchoolLogo = "images/pictures/logo.svg";
const rsSchoolLink = "https://rs.school/"; 


function AboutUs() {
  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">Meet the Sleepless Team</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
        {teamMembers.map((member) => (
          <Box key={member.name} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={member.photo} alt={`${member.name}'s photo`} borderRadius="full" boxSize="150px" mx="auto" />
            <VStack align="center" mt={4}>
              <Heading as="h2" size="md">{member.name}</Heading>
              <Text fontWeight="bold">{member.role}</Text>
              <Text textAlign="center" px={4}>{member.bio} 📄</Text>
              <Link href={member.github} color="teal.500" isExternal>GitHub Profile 🌐</Link>
              <Text mt={2} fontWeight="bold">Contributions 🏗️:</Text>
              <VStack align="start">
                {member.contributions.map((contribution) => (
                  <Text key={`${member.name}-${contribution}`}>- {contribution}</Text>
                ))}
              </VStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      <Box mt={10} textAlign="center">
        <Heading as="h2" size="lg" mb={4}>Our Collaboration 🤝</Heading>
        <Text fontSize="lg" maxW="3xl" mx="auto">
          The success of the Sleepless Project is a result of our high level of expertise, effective communication, and a supportive team environment.
          Under the mentorship of Irina and Alexander, we maintained strict discipline, received unwavering support, and embraced our mistakes as learning opportunities.
        </Text>
      </Box>

              {/* RS School Logo Section */}
              <Box textAlign="center" mb={10}>
        <Link href={rsSchoolLink} isExternal>
          <Image src={rsSchoolLogo} alt="RS School Logo" boxSize="150px" mx="auto" />
        </Link>
      </Box>
    </Box>
  );
};

export default AboutUs;
