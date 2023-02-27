

export  const InsyranceService = {
    getInsurance,
};

function getInsurance(id) {
    return http.get('http://localhost:3000/insurance/{id}');
}