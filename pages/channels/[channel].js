import { useEffect, useState, useCallback } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';

import {
  Button,
  Text,
  HStack,
  Box,
  Input,
} from '@chakra-ui/react';

import { subscribe, publishMessage } from '../../graphql/queries';

function ChannelPage() {
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const router = useRouter();
  const { channel: queryChannel } = router.query;

  // Use useCallback for the Subscribe function
  const subscribeToChannel = useCallback(async (channel) => {
    try {
      const sub = API.graphql(
        graphqlOperation(
          subscribe(channel),
          {},
          'auth123',
        ),
      ).subscribe({
        next: ({ value }) => {
          const receivedMessageBase64 = value.data.subscribe.data;
          const receivedMessage = Buffer.from(receivedMessageBase64, 'base64').toString('utf8');
          // Use the updater function to avoid unnecessary array copies
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        },
        error: (error) => console.warn(error),
      });

      // Return the unsubscribe function
      return () => sub.unsubscribe();
    } catch (error) {
      console.error('Error subscribing', error);
    }
  }, []);

  useEffect(() => {
    let unsubscribe;

    const setupSubscription = async () => {
      if (channel && channel.length > 1) {
        unsubscribe = await subscribeToChannel(channel);
      }
    };

    if (queryChannel && queryChannel.length > 1) {
      setChannel(queryChannel);
      setupSubscription();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [channel, queryChannel, subscribeToChannel]);

  const handleSendMessage = async () => {
    if (newMessage) {
      const response = await API.graphql(
        graphqlOperation(
          publishMessage(Buffer.from(newMessage, 'utf8').toString('base64'), channel),
          {},
          'auth123',
        ),
      );
      setNewMessage('');
    }
  };

  return (
    <Box p={4}>
      <Box p={4} bg="gray.100" mb={4}>
        <HStack>
          <Text fontSize="xl">Channel:</Text>
          <Text as="b" fontSize="xl">{channel}</Text>
        </HStack>
      </Box>

      <Box p={4} bg="white" minHeight="300px" border="1px solid #ccc" rounded="md">
        {messages.map((message, index) => (
          <Text key={index} mb={2}>
            {message}
          </Text>
        ))}
      </Box>

      <HStack mt={4}>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button colorScheme="teal" onClick={handleSendMessage}>
          Send
        </Button>
      </HStack>
    </Box>
  );
}

export default ChannelPage;
