import { TextAnimate } from "@/components/ui/text-animate"

type Props = {
	total: string
}

export default function SubscriptionTotal({ total }: Props) {
	return (
		<TextAnimate
			className="text-5xl md:text-6xl text-primary font-semibold"
			duration={0.3}
			getDelay={(i) => i * 0.05}
			transition={{ ease: [0.175, 0.885, 0.32, 1.1] }}>
			{total}
		</TextAnimate>
	)
}
