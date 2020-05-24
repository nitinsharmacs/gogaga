const validate = () =>{
	const name = document.getElementById('frndName');
	if(name.value === ''){
		alert('Enter friend Name');
		return false;
	}
};

const loadFriends = () => {
	const list = document.querySelector('.list');
	list.innerHTML = 'Loading....';
	fetch('/users').then(res=>res.json()).then(result=>{
		list.innherHTML = '';
		if(result.data.length>0){
				result.data.forEach(val=>{
				console.log(val)
				var li = document.createElement('li');
				li.innerHTML = val.name;
				list.appendChild(li);
			});
		} else {
			list.innerHTML = 'No Friend, Please add someone';
		}
		
	}).catch(err=>{
		console.log(err);
	});
};
