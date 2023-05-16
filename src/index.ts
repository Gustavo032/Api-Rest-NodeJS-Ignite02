interface TypeOfCalculateAgeOfUser {
	birthYear?: number,
}

function calculateAgeOfUser(user:TypeOfCalculateAgeOfUser) {
	return new Date().getFullYear() - user.birthYear
}

calculateAgeOfUser({birthYear: })

// Runtime Type Checking - só detectar quando estiver executando

// Static Type Checking - No momento que estamos desenvolvendo