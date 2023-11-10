const Spinner = () => {
	return (
		<>
			{/* <svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				style={{ margin: "300px auto", background: "none", display: "block", shapeRendering: "auto" }}
				width="200px"
				height="200px"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
			>
				<circle cx={50} cy={50} r={32} strokeWidth={8} stroke="#0a4f51" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
					<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50" />
				</circle>
			</svg> */}

			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				style={{
					// margin: "auto",
					background: "none",
					display: "block",
					shapeRendering: "auto",
				}}
				width="200px"
				height="200px"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
				className=" mx-auto mt-60 md:mt-96 lg:mt-60"
			>
				<circle
					cx={50}
					cy={50}
					r={0}
					fill="none"
					stroke="#111827"
					strokeWidth={2}
				>
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="1s"
						values="0;32"
						keyTimes="0;1"
						keySplines="0 0.2 0.8 1"
						calcMode="spline"
						begin="0s"
					/>
					<animate
						attributeName="opacity"
						repeatCount="indefinite"
						dur="1s"
						values="1;0"
						keyTimes="0;1"
						keySplines="0.2 0 0.8 1"
						calcMode="spline"
						begin="0s"
					/>
				</circle>
				<circle
					cx={50}
					cy={50}
					r={0}
					fill="none"
					stroke="#1f2937"
					strokeWidth={2}
				>
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="1s"
						values="0;32"
						keyTimes="0;1"
						keySplines="0 0.2 0.8 1"
						calcMode="spline"
						begin="-0.5s"
					/>
					<animate
						attributeName="opacity"
						repeatCount="indefinite"
						dur="1s"
						values="1;0"
						keyTimes="0;1"
						keySplines="0.2 0 0.8 1"
						calcMode="spline"
						begin="-0.5s"
					/>
				</circle>
			</svg>
		</>
	)
}

export default Spinner
