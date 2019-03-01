import { toast } from 'react-toastify';

export default ({ success = [], error = [] }) => {
	success.forEach((a) => {
    console.log(a);
		toast.success(a, {
			position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000

		});
	});
	error.forEach((e) => {
		toast.error(e, {
			position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000
		});
	});

};
