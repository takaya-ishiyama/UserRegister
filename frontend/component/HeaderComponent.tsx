import { HamburgerIcon } from '@chakra-ui/icons'
import { 
  Box, 
  Button, 
  Flex, 
  MenuButton, 
  MenuItem, 
  MenuList, 
  Spacer,
  Menu,

} from '@chakra-ui/react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const HeaderComponent = () => {
  const router = useRouter();
  return (
      <Box px={4} h={50} bgColor={"#edf2f7"}>
        <Flex>
          <Box
            px={2}
            fontSize={"35px"}
          >
            <Link href={"/"}>
             header
            </Link>
          </Box>
          <Spacer/>
          <Menu>
              <MenuButton 
                m={1} 
                p={1}
                as={Button}
              >
                <HamburgerIcon
                  boxSize={9}
                  p={1}
                />
              </MenuButton>
            {/* </Button> */}
            <MenuList 
              bgColor={"#edf2f7"}
            >
              <MenuItem 
                textAlign={"center"}
                display={"inline-block"}
                bgColor={"#edf2f7"}
                onClick={()=>{router.push('/login')}}
                as={Button}
              >
                Longin
              </MenuItem>
              <MenuItem 
                textAlign={"center"}
                display={"inline-block"}                
                bgColor={"#edf2f7"}
                onClick={()=>{router.push("/sing_up")}}
                as={Button}
              >
                Sign up
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
  )
}

export default HeaderComponent