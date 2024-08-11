import api from "./api/axiosConfig";


export const searchHotels = async(searchParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('place',searchParams.place || "");
    queryParams.append('checkIn',searchParams.checkIn || "");
    queryParams.append('checkOut',searchParams.checkOut || "");
    queryParams.append('adultcnt',searchParams.adultcnt || "");
    queryParams.append('childCnt',searchParams.childCnt || "");
    queryParams.append('page',searchParams.page || "");
    queryParams.append('maxPrice',searchParams.maxPrice || "");
    queryParams.append('sortOption',searchParams.sortOption || "");
    
    searchParams.facilities?.forEach((fac)=> 
        queryParams.append("facilities",fac)
    );

    searchParams.types?.forEach((typ)=> 
        queryParams.append("types",typ)
    );

    if (Array.isArray(searchParams.starRating)) {
        searchParams.starRating.forEach((star) =>
            queryParams.append("starRating", star)
        );
    }

    try {
        const response = await api.get(`/hotelRoute2/search?${queryParams}`);
        return response.data;

    } catch (error) {
        console.log(error)
    }
        
}

export const fetchUserData = async () => {
    try {
        const response = await api.get(`/userRoute/getMe`,{
          withCredentials:"include"
        });
        if (response.status === 200) {
          //setloggedinUser(response.data);
          return response.data;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

export const createPaymentIntent = async(hotelId,numNyts) =>{
    try {
        const response = await api.post(`/hotelRoute2/${hotelId}/bookings/payment-intent`, { numNyts },{
            withCredentials:true,
            headers:{
                'Content-Type':'application/json'
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error creating payment intent:', error);
    }
    
}

export const bookHotelRoom = async(hotelId,bookingBody) =>{
    try {
        await api.post(`/hotelRoute2/${hotelId}/bookings`,bookingBody,{
            withCredentials: "true",
            headers:{
                'Content-Type':'application/json',
            }
        });

        
    } catch (error) {
        console.error(error);
    }
}

export const fetchMyBookings = async(userId) =>{
    try {
        const response = await api.get(`/bookingsRoute/${userId}`,{
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
    
}

export const cancelABooking = async(hotelId,bookId) =>{
    try {
        const response = await api.delete(`/hotelRoute2/${hotelId}/bookings/${bookId}`);

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        console.error(error);
    }
}