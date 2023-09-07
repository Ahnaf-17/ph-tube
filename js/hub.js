const loadVideo = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json();
    const videos = data.data;
    const tabContainer = document.getElementById('tab-container');
    videos.forEach((category) => {
        // console.log(category);
        const createDiv = document.createElement('div');

        createDiv.innerHTML = `
            <a onclick="handleCategory('${category.category_id}')" class="tab">${category.category}</a> 
            `;
        tabContainer.appendChild(createDiv);
    })

    console.log(videos);


}



const handleCategory = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();

    // console.log(data.data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const cardContainer2 = document.getElementById('card-container-2');
    cardContainer2.innerHTML = '';




    if (data.data.length != 0) {
        data.data?.forEach((detail) => {
            console.log(detail)
            const isVerified = detail.authors[0].verified;

            const Time = detail.others.posted_date;
            const hour = parseInt(parseInt(Time) / 3600);
            const min = parseInt(parseInt(Time) / 60) % 60;


            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                <div class="relative">
                <figure><img class="h-[250px] w-full" src=${detail?.thumbnail}  alt="" /></figure>
                <span class="bottom-0 right-0 absolute text-white bg-black">${(hour || min)
                    ? `
                  ${hour?`${hour}hrs`:""}

                  ${min?`${min} min`:""} ago
               `:""}</span>
                </div>
                
                <div class="flex">
                <div>
                <img class="h-[50px] w-[50px] rounded-3xl mt-10 ml-2" src=${detail?.authors[0]?.profile_picture}  alt="Shoes" />
                
                </div>
                <div>
                <div class="card-body">
                  <h2 class="card-title ">${detail.title}</h2>
                  <div class="flex">
                  <h2 class="flex flex-row mr-3">${detail?.authors[0]?.profile_name} ${isVerified ? `
                  <img class="ml-2" src="image/fi_10629607.png" alt="">

                  `: ""}</h2>
                  
                  
                  </div>
                  <h2 class="">${detail?.others?.views} views</h2>
                </div>
                

                </div>
                </div>
              </div>
        `;
            cardContainer.appendChild(div);

        })

    } else {

        const div = document.createElement('div');
        cardContainer2.classList.remove('hidden');



        div.innerHTML = `
        <div class="text-center flex justify-center items-center">
        <img  src="./image/Icon.png" alt="">
        
        </div>
        <p class="font-extrabold text-2xl lg:text-4xl">Oops!! Sorry, There is no <br> content here</p>
        `;
        cardContainer2.appendChild(div);




    }


}

// const handleSort = async (sort_id) => {
//     const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${sort_id}`);
//     const data = await res.json();
// const value = data.data;
//     // console.log(data.data);
    
//     const tempArr = []



//     for (const item of value) {
//         const viewNo = parseFloat(item.others.views);
//         tempArr.push(viewNo);
//     }

//     tempArr.sort((a, b) => a - b);
//     tempArr.reverse();
//     console.log(tempArr)

//     const cardContainer = document.getElementById('card-container');
//     cardContainer.innerHTML = '';
//     const cardContainer2 = document.getElementById('card-container-2');
//     cardContainer2.innerHTML = '';

    


// }



// const Time = async (sec)=>{
//     let hour = sec/3600;
//     let min = sec/60;
//     let seconde = sec/60;
//     return `<div>
//     ${hour}hour ${min}min ${sec}sec
//     </div>
//     `;
// }

loadVideo();
handleCategory("1000");
