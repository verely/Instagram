export const post = {
    "_id": "s101",
    "desc": "Best trip ever",
    "imgUrl": "http://some-img",
    "owner": {
      "_id": "u101",
      "userName": "Sloner_garden",
      "fullName": "Mashtelat Sloner",
      "imgUrl": "http://some-img"
    },
    "created_at": "1712839080",
    "loc": {
      "lat": 11.11,
      "lng": 22.22,
      "name": "Tel Aviv"
    },
    "comments": [
      {
        "id": "c1001",
        "by": {
          "_id": "u105",
          "userName": "Bob",
          "imgUrl": "http://some-img"
        },
        "txt": "good one!",
        "likedBy": [
          {
            "_id": "u105",
            "userName": "Bob",
            "imgUrl": "http://some-img"
          }
        ]
      },
      {
        "id": "c1002",
        "by": {
          "_id": "u106",
          "userName": "Dob",
          "imgUrl": "http://some-img"
        },
        "txt": "not good!",
      }
    ],
    "likedBy": [
      {
        "_id": "u105",
        "userName": "Bob",
        "imgUrl": "http://some-img"
      },
      {
        "_id": "u106",
        "userName": "Dob",
        "imgUrl": "http://some-img"
      }
    ],
    "tags":["fun", "kids"]
  }
