import {
  Text,
  Box,
  Link,
} from '@chakra-ui/react';

const channels = [
  'AWS',
  'Docker',
  'Kubernetes',
  'Jira',
  'JavaScript',
  'React',
  'Python',
  'Node.js',
  'Java',
  'DevOps',
  'Git',
  'CI/CD',
  'Linux',
  'ML',
  'Frontend Development',
  'Backend Development',
  'Web Development',
  'Data Science',
  'Cybersecurity',
];

function App() {
  return (
    <>
      {channels.map((channelName) => {
        return (
          <Box key={channelName} p={4}>
            <Link href={`channels/${channelName}`}>
              <Box p={4} mb={-4} bg="gray.100">
                <Text as="u" color="blue.600">
                  {channelName}
                </Text>
              </Box>
            </Link>
          </Box>
        );
      })}
    </>
  );
}

export default App;
