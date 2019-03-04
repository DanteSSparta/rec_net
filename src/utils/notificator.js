import { toast } from 'react-toastify';

export default ({ success = [], error = [] }) => {
	success.forEach((a) => {
		toast.success(a, {
			position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 3000

		});
	});
	error.forEach((e) => {
		toast.error(e, {
			position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 3000
		});
	});

};
