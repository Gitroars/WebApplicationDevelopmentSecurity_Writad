import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { SiHive, SiMarketo, SiMicrosoft } from "react-icons/si";
import { ActionButton } from "../components/ActionButton";
import { PricingCard } from "../components/PricingCard";

export const PriceScreen = () => (
  <Box
    as='section'
    bg={useColorModeValue("gray.50", "gray.800")}
    py='14'
    px={{
      base: "4",
      md: "8",
    }}
  >
    <SimpleGrid
      columns={{
        base: 1,
        lg: 3,
      }}
      spacing={{
        base: "8",
        lg: "0",
      }}
      maxW='7xl'
      mx='auto'
      justifyItems='center'
      alignItems='center'
    >
      <PricingCard
        data={{
          price: "$2/wk",
          name: "Weekly VIP",
          features: ["Unlimited Reading", "Free Updates"],
        }}
        icon={SiMicrosoft}
        button={
          <ActionButton variant='outline' borderWidth='2px'>
            Buy now
          </ActionButton>
        }
      />
      <PricingCard
        data={{
          price: "$5/mo",
          name: "Monthly VIP",
          features: ["Unlimited Reading", "Free Updates"],
        }}
        icon={SiHive}
        button={<ActionButton>Buy now</ActionButton>}
      />
      <PricingCard
        zIndex={1}
        isPopular
        transform={{
          lg: "scale(1.05)",
        }}
        data={{
          price: "$30/yr",
          name: "Annual VIP",
          features: ["Unlimited Reading", "Free Updates"],
        }}
        icon={SiMarketo}
        button={
          <ActionButton variant='outline' borderWidth='2px'>
            Buy now
          </ActionButton>
        }
      />
    </SimpleGrid>
  </Box>
);
