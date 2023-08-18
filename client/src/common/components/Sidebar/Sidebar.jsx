import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, CheckboxGroup, Flex, HStack, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Radio, RadioGroup, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from '@chakra-ui/react';

import Logo from '../../../assets/logo';
import HomeIcon from '../../../assets/home';
import BookmarkIcon from '../../../assets/bookmark';
import CommunitiesIcon from '../../../assets/communities';
import ListIcon from '../../../assets/list';
import MessageIcon from '../../../assets/message';
import MoreIcon from '../../../assets/more';
import NotificationIcon from '../../../assets/notification';
import ProfileIcon from '../../../assets/profile';
import SearchIcon from '../../../assets/search';
import VerifiedIcon from '../../../assets/verified';
import Monetization from '../../../assets/Monetization';
import AtIcon from '../../../assets/At';
import Drafts from '../../../assets/Drafts';

import SidebarItem from './SidebarItem/SidebarItem';
import styled from '@emotion/styled';
import globalStore, { globalStoreSelector } from '../../../store/globalStore';
import Tweet from '../../../pages/Home/Components/Tweet/Tweet';
import { userWindowSizeContext } from '../../../context/WindowSizeContext';

const Sidebar = () => {
	const { isGreaterThan1100 } = userWindowSizeContext();

	return (
		<Box as='div' borderRight='1px' borderRightColor='border' padding='10px' width={isGreaterThan1100 ? "240px" : "88px"} height="100vh" position='sticky' top='0' bg="main" left="0">
			<Link to="/">
				<Box fill="secondary" padding="10px 20px">
					<Logo size="30px" />
				</Box>
			</Link>

			<SidebarItem sidebarItem={{
				name: "Home",
				link: true,
				Icon: HomeIcon,
				slug: "/"
			}} />
			<SidebarItem sidebarItem={{
				name: "Search",
				link: true,
				Icon: SearchIcon,
				slug: "/search"
			}} />
			<SidebarItem sidebarItem={{
				name: "Notification",
				link: true,
				Icon: NotificationIcon,
				slug: "/notification"
			}} />
			<SidebarItem sidebarItem={{
				name: "Message",
				link: true,
				Icon: MessageIcon,
				slug: "/message"
			}} />
			<SidebarItem sidebarItem={{
				name: "List",
				link: true,
				Icon: ListIcon,
				slug: "/list"
			}} />
			<SidebarItem sidebarItem={{
				name: "Bookmark",
				link: true,
				Icon: BookmarkIcon,
				slug: "/bookmark"
			}} />
			<SidebarItem sidebarItem={{
				name: "Communities",
				link: true,
				Icon: CommunitiesIcon,
				slug: "/communities"
			}} />

			<SidebarVerifyButton />

			<SidebarItem sidebarItem={{
				name: "Profile",
				link: true,
				Icon: ProfileIcon,
				slug: "/profile" // username authentication
			}} />

			<SidebarMoreButton />
		</Box>
	)
}

export default Sidebar;

const SidebarVerifyButton = () => {
	const [isVerifiedModalOpen, setIsVerifiedModalOpen] = useState(false);

	const verifyModalHandler = () => {
		setIsVerifiedModalOpen(!isVerifiedModalOpen)
	}

	return (
		<>
			<SidebarItem sidebarItem={{
				name: "Verified",
				link: false,
				Icon: VerifiedIcon,
				slug: isVerifiedModalOpen,
				onClickHandler: verifyModalHandler
			}} />
			<Modal isOpen={isVerifiedModalOpen} onClose={verifyModalHandler}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						some shit
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

const SidebarMoreButton = () => {
	const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
	const [isDisplayOptionOpen, setIsDisplayOptionOpen] = useState(false);

	const displayModalHandler = () => {
		setIsDisplayOptionOpen(!isDisplayOptionOpen)
	}

	const moreMenuOptionOne = [
		{
			icon: AtIcon,
			name: "Connect"
		},
		{
			icon: Drafts,
			name: "Drafts"
		},
		{
			icon: Monetization,
			name: "Monetization"
		},
	]

	const moreMenuOptionTwo = [
		{
			name: "Creator Studio",
			items: [
				{
					Icon: false,
					name: "Analytics"
				}
			]
		},
		{
			name: "Professional Tools",
			items: [
				{
					Icon: false,
					name: "Twitter Ads"
				}
			]
		},
		{
			name: "Settings and Support",
			items: [
				{
					Icon: false,
					name: "Settings and Privacy"
				},
				{
					Icon: false,
					name: "Help Center"
				},
				{
					Icon: false,
					name: "Display"
				},
				{
					Icon: false,
					name: "Keyboard Shortcuts"
				}
			]
		}
	]

	return (
		<>
			<Menu>
				<MenuButton _hover={{ bg: "hover" }} w="full" rounded='full'>
					<SidebarItem sidebarItem={{
						name: "More",
						link: false,
						Icon: MoreIcon,
						slug: isMoreMenuOpen,
						onClickHandler: () => setIsMoreMenuOpen(true),
					}} />
				</MenuButton>

				<MenuList shadow='lg' borderColor="border" bg='main' color="secondary">
					{
						moreMenuOptionOne.map((item, idx) => (
							<MenuItem bg='main' key={idx}>
								<Flex color="secondary" fill='secondary' justifyContent='flex-start' alignItems='center' gap={3}>
									<item.icon size="30px" />
									<Text fontSize='lg' fontWeight='semibold'>
										{item.name}
									</Text>
								</Flex>
							</MenuItem>
						))
					}
					<MenuDivider />
					<Accordion allowToggle>
						{
							moreMenuOptionTwo.map((option, idx) => (
								<AccordionItem border="none" key={idx}>
									<h2>
										<AccordionButton>
											<Box as="span" flex='1' textAlign='left'>
												{option.name}
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										{
											option.items.map((item, index) => (
												<MenuItem key={index} bg='main' color="secondary">
													<Text fontSize='small'>{item.name}</Text>
												</MenuItem>
											))
										}
									</AccordionPanel>
								</AccordionItem>
							))
						}
					</Accordion>
				</MenuList>

				<DisplayModal displayModalHandler={displayModalHandler} isDisplayOptionOpen={isDisplayOptionOpen} />

			</Menu>
		</>
	)
}

const DisplayModal = ({ isDisplayOptionOpen, displayModalHandler }) => {

	const { changeTheme, accent, theme, changeAccent } = globalStore(globalStoreSelector)

	const accentOptions = [
		{
			bg: "blue",
			onClickHandler: () => changeAccent('blue')
		},
		{
			bg: "yellow",
			onClickHandler: () => changeAccent('yellow')
		},
		{
			bg: "pink",
			onClickHandler: () => changeAccent('pink')
		},
		{
			bg: "purple",
			onClickHandler: () => changeAccent('purple')
		},
		{
			bg: "orange",
			onClickHandler: () => changeAccent('orange')
		},
		{
			bg: "green",
			onClickHandler: () => changeAccent('green')
		}
	]

	const colorOptions = [
		{
			bg: "default",
			color: "black",
			accent: "blackAlpha",
			value: "light",
			onClickHandler: () => changeTheme('light')
		},
		{
			bg: "dim",
			color: "white",
			value: "dim",
			accent: "white",
			onClickHandler: () => changeTheme('dim')
		},
		{
			bg: "light_out",
			color: "white",
			value: "dark",
			accent: "white",
			onClickHandler: () => changeTheme('dark')
		},
	]

	return (
		<Modal isCentered size="xl" isOpen={isDisplayOptionOpen} onClose={displayModalHandler}>
			<ModalOverlay />
			<ModalContent bg="main" color="secondary">
				<ModalBody>
					<VStack gap={0} maxWidth='450px' mx='auto'>
						<Box textAlign='center' pb="5">
							<Text fontSize='2xl' fontWeight='bold' pt='5'>Customize your view</Text>
							<Text color="secondaryText">These settings affect all the Twitter accounts on this browser.</Text>
						</Box>
						<Tweet tweet={{
							user: {
								avatar: "https://pbs.twimg.com/profile_images/1013798240683266048/zRim1x6M_normal.jpg",
								username: "Twitter",
								fullName: "Twitter"
							},
							createdAt: "4h",
							isVerified: true,
							desc: "At the heart of Twitter are short messages called Tweets--just like this one--which can include photos, videos, links, text, hashtags, and mentions like @Twitter."
						}} />
						<Box width="full" pb="5" maxWidth='450px'>
							<Text>Font size (not working) </Text>
							<Slider defaultValue={0} step={20} min={0} max={100}>
								<SliderTrack bg='border'>
									<Box position='relative' right={10} />
									<SliderFilledTrack bg={accent} />
								</SliderTrack>
								<SliderThumb boxSize={6} />
							</Slider>
						</Box>
						<Box width="full" pb="3">
							<Text>Color</Text>
							<RadioGroup bg='border' rounded='xl' py='2' display='flex' flex='1' defaultValue={accent} justifyContent='space-around'>
								{
									accentOptions.map((option, idx) => (
										<Flex width="40px" key={idx} height="40px" rounded='full' bg={option.bg} justifyContent='center' alignItems='center' onClick={option.onClickHandler} >
											<Radio value={option.bg} rounded='full' colorScheme={option.bg} />
										</Flex>
									))
								}
							</RadioGroup>
						</Box>
						<Box width="full" pb='5'>
							<Text>Background</Text>
							<RadioGroup rounded='xl' py='2' px="5" bg='border' gap={3} defaultValue={theme} display='flex' justifyContent='space-around' flex='1'>
								{
									colorOptions.map((option, idx) => (
										<Flex rounded='xl' key={idx} flex='1' color={option.color} onClick={option.onClickHandler} justifyContent='center' alignItems='center' height="70px" bg={option.bg} border='1px' borderColor={accent}>
											<Radio value={option.value} rounded='full' colorScheme={option.accent}>
												{
													option.value.toUpperCase()
												}
											</Radio>
										</Flex>
									))
								}
							</RadioGroup>
						</Box>
						<Button bg={accent} _hover={{ bg: accent, opacity: "0.8" }} onClick={displayModalHandler} mb='6' mt='3'>Done</Button>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}