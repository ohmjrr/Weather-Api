import {
  Flex,
  Text,
  Box,
  Image,
  Input,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onToggle } = useDisclosure(false);
  const apiKey = "2ccc87b927c79bedfce5b298d1d2a8a1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        setLoading(true);
        onToggle(true);
        console.log(res.data);
      });
      setLocation("");
    }
    if (isOpen === true) {
      onToggle(true);
    }
  };

  const tempCelsius = (data?.main?.temp - 273).toFixed();
  const maxTemp = (data?.main?.temp_max - 273).toFixed();
  const minTemp = (data?.main?.temp_min - 273).toFixed();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      w="100vw"
      h="100vh"
      bgImage="url(/image/photo-1592210454359-9043f067919b.webp)"
      bgSize="cover"
    >
      <Flex flexDirection="column" alignItems="center" mt={36}>
        <Input
          placeholder="Location"
          color="white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleSearch}
          w="600px"
        />
        {loading && (
          <>
            <ScaleFade initialScale={0.9} in={isOpen}>
              <Flex flexDirection="column" alignItems="center" mt={10}>
                <Text fontSize="60px" fontWeight="bold" color="white" textShadow="2xl">
                  {data.name}
                </Text>
              </Flex>
              <Flex flexDirection="column" w="600px" h="400px" mt={45}>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  h="50%"
                >
                  <Flex
                    w="250px"
                    flexDirection="column"
                    alignItems="center"
                    border="2px solid white"
                    borderRadius="10px"
                    boxShadow="3px 3px 10px"
                    mb={55}
                  >
                    <Text fontSize="100px" color="white" fontWeight="bold">
                      {tempCelsius}°C
                    </Text>
                  </Flex>
                </Flex>

                <Flex h="32%" gap={10}>
                  <Flex
                    w="33%"
                    border="2px solid white"
                    borderRadius="10px"
                    boxShadow="3px 3px 10px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text fontSize="25px" color="white" fontWeight="bold">
                      สูงสุด : {maxTemp}°c
                    </Text>
                  </Flex>
                  <Flex
                    w="34%"
                    border="2px solid white"
                    borderRadius="10px"
                    boxShadow="3px 3px 10px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} boxSize="70px"
                    />
                  </Flex>
                  <Flex
                    w="33%"
                    border="2px solid white"
                    borderRadius="10px"
                    boxShadow="3px 3px 10px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text fontSize="25px" color="white" fontWeight="bold">
                      ต่ำสุด : {minTemp}°c
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </ScaleFade>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Weather;
