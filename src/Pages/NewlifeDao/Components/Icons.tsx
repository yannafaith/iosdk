import { Progress } from "antd";

export const ProgressBar = ( { proposal, width } ) => <Progress
	style={ {width: width || "642px"} }
	strokeColor={ "#C46EF7" }
	percent={ 100 } // pink color
	success={ { percent: proposal.vote_yes?.quantity, strokeColor:"#BAFF00"} } // yellow color
	showInfo={ false }
/>

export const Hands = ( { width, height }: React.SVGProps<SVGSVGElement>) => <svg width={ width || "35" } height={ height || 35 } viewBox="0 0 57 36" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M47.5545 9.31651H36.0743C35.6008 9.31651 35.1467 9.12019 34.8119 8.77075C34.4771 8.42131 34.2891 7.94736 34.2891 7.45318C34.2891 6.95899 34.4771 6.48504 34.8119 6.1356C35.1467 5.78616 35.6008 5.58984 36.0743 5.58984H47.5545C48.028 5.58984 48.4821 5.78616 48.8169 6.1356C49.1516 6.48504 49.3397 6.95899 49.3397 7.45318C49.3397 7.94736 49.1516 8.42131 48.8169 8.77075C48.4821 9.12019 48.028 9.31651 47.5545 9.31651Z" fill="#FCFCF3"/>
	<path d="M43.5938 0H40.0234V14.9067H43.5938V0Z" fill="#FCFCF3"/>
	<path d="M36.7094 20.2232V24.687C36.668 24.7101 36.648 24.7309 36.628 24.7309C34.0131 24.7511 31.3988 24.7757 28.8095 24.2987C26.4095 23.8559 24.3823 22.6306 22.5442 21.0192C22.0893 20.6204 21.6195 20.2388 21.1832 19.8185C19.5615 18.257 17.6192 17.7919 15.4784 17.9313C14.3294 18.0058 13.2819 18.4239 12.2286 18.851C10.1257 19.7037 8.01555 20.5407 5.91044 21.3852C5.77976 21.4373 5.65194 21.4947 5.49198 21.5625C5.95328 22.9176 6.40529 24.2457 6.87087 25.6134C7.27147 25.4562 7.64493 25.3108 8.01768 25.1618C10.3246 24.241 12.6316 23.3185 14.9385 22.3943C15.0447 22.3448 15.161 22.3235 15.277 22.3322C15.3929 22.3409 15.5051 22.3794 15.6034 22.4443C20.491 25.2581 25.3808 28.0705 30.2727 30.8814C30.5276 31.0305 30.7276 31.0439 30.9953 30.9276C38.9597 27.4778 46.9262 24.0338 54.8949 20.5958C55.0377 20.5355 55.1805 20.4818 55.3512 20.4125L57 24.5513C56.6708 24.7004 56.3573 24.8383 56.046 24.9739C47.6065 28.6216 39.1689 32.2697 30.7333 35.9184C30.4834 36.0265 30.2891 36.0339 30.0421 35.8916C25.1449 33.0672 20.2458 30.2464 15.3449 27.4291C15.0207 27.2412 14.7665 27.2748 14.4523 27.4015C11.1732 28.7232 7.89177 30.038 4.60795 31.3458C4.52012 31.3808 4.42944 31.4114 4.28448 31.4643C2.85632 27.286 1.43244 23.1166 0 18.9174C1.03899 18.5 2.04512 18.0938 3.05269 17.6905C6.01255 16.5055 8.936 15.2049 11.9423 14.1644C16.2146 12.6864 20.2627 13.15 23.841 16.2513C24.4715 16.7984 25.1078 17.338 25.729 17.8955C27.3 19.3064 29.1509 19.9578 31.1896 20.057C32.8741 20.1397 34.5615 20.1665 36.2474 20.2172C36.3888 20.2232 36.5266 20.2232 36.7094 20.2232Z" fill="#FCFCF3"/>
</svg>

