import { Box, Grid, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import Sidebar from '../Sidebar'
import { DoughnutChart, LineChart } from './Chart'

const Dashboard = () => {
  const Databox = ({title, quantity, quantityPercent, profit}) => {
    return (
      <Box
        width={["full", "20%"]}
        boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"}
        padding={"8"}
        borderRadius={"lg"}
      >
        <Text children={title} />

        <HStack>
          <Text fontSize={"xl"} fontWeight={"bold"} children={quantity} />

          <HStack>
            <Text children={`${quantityPercent}%`} />
            { profit ?
              <RiArrowUpLine color='green' /> :
              <RiArrowDownLine color='red' />
            }
          </HStack>
        </HStack>

        <Text children={"Since last month"} fontSize={"sm"} opacity={0.7} />
      </Box>
    );
  }

  const Bar = ({title, value, profit}) => {
    return (
      <Box
        paddingX={["0", "20"]}
        paddingY={"4"}
      >
        <Heading
          size="sm"
          children={title}
          marginBottom="2"
        />

        <HStack width="full" alignItems={"center"}>
          <Text children={profit ? "0%" : `${value}%`} />
          <Progress width={"full"} value={profit ? value : 0} colorScheme={"purple"} />
          <Text children={`${value>100 ? value : 100}%`} />
        </HStack>
      </Box>
    )
  }

  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box
        boxSizing="border-box"
        paddingY={"16"}
        paddingX={["4", "0"]}
      >
        <Text
          textAlign={"center"}
          opacity={0.5}
          children={`Last change was on ${String(new Date()).split('G')[0]}`}
        />

        <Heading
          children="Dashboard"
          marginLeft={["0", "16"]}
          marginBottom="16"
          textAlign={["center", "left"]}
        />

        <Stack
          direction={["column", "row"]}
          minH="24"
          justifyContent={"space-evenly"}
        >
          <Databox title={"Views"} quantity={143} quantityPercent={30} profit={true} />
          <Databox title={"Users"} quantity={47} quantityPercent={20} profit={true} />
          <Databox title={"Subscriptions"} quantity={23} quantityPercent={-34} profit={false} />
        </Stack>

        <Box
          margin={["0", "16"]}
          borderRadius="lg"
          padding={["0", "16"]}
          marginTop={["4", "16"]}
          boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"}
        >
          <Heading
            textAlign={["center", "left"]}
            size={"md"}
            paddingTop={["8", "0"]}
            marginLeft={["0", "16"]}
            children="Views graph"
          />

          <LineChart />
        </Box>

        <Grid templateColumns={["1fr", "2fr 1fr"]} >
          <Box padding={"4"}>
            <Heading
              textAlign={["center", "left"]}
              size={"md"}
              marginY={"8"}
              marginLeft={["0", "16"]}
              children="Progress Bar"
            />

            <Box>
              <Bar profit={true} title={"Views"} value={30} />
              <Bar profit={true} title={"Users"} value={20} />
              <Bar profit={false} title={"Subscriptions"} value={-34} />
            </Box>
          </Box>

          <Box
            padding={["0", "16"]}
            boxSizing={"border-box"}
            paddingY={"4"}
          >
            <Heading
              textAlign={"center"}
              size={"md"}
              marginBottom={"4"}
              children="Users"
            />

            <DoughnutChart />
          </Box>
        </Grid>
        
      </Box>
      <Sidebar />
    </Grid>
  )
}

export default Dashboard