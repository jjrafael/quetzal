export const formInfo = {
	formName: 'appSettings',
	className: 'appSettings --col2',
	groupedInputs: 0,
	noSubmitButton: true,
	inputs: [
		{
			id: 'timer',
			label: 'Timer (minutes)',
			component: 'quantity',
			value: 3,
			showLabel: true,
			validations: ['numberOnly', 'numMax-8'],
		}
	]
}

export default formInfo;