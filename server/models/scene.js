const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sceneSchema = new Schema(
  {
    template: {
      type: String
    },
    imageUrl: {
      type: String
    },
    title: {
      type: String
    },
    address: {
      type: String
    },
    lowestprice: {
      type: Number
    },
    avgprice: {
      type: Number
    },
    oldPrice: {
      type: String
    },
    latitude: {
      type: String
    },
    longitude: {
      type: String
    },
    showType: {
      type: String
    },
    avgscore: {
      type: Number
    },
    backCateName: {
      type: String
    },
    areaname: {
      type: String
    },
    abstracts: [
      {
        icon: {
          type: String
        },
        message: {
          type: String
        }
      }
    ],
    deals: [
      {
        title: {
          type: String
        },
        price: {
          type: Number
        },
        value: {
          type: Number
        },
        sales: {
          type: Number
        },
        iUrl: {
          type: String
        }
      }
    ],
    comments: [
      {
        userName: {
          type: String
        },
        userUrl: {
          type: String
        },
        avgPrice: {
          type: Number
        },
        comment: {
          type: String
        },
        merchantComment: {
          type: String
        },
        picUrls: [
          {
            type: String
          }
        ],
        commentTime: {
          type: String
        },
        replyCnt: {
          type: String
        },
        zanCnt: {
          type: String
        },
        readCnt: {
          type: String
        },
        hilignt: {
          type: String
        },
        userLevel: {
          type: Number
        },
        userId: {
          type: Number
        },
        uType: {
          type: Number
        },
        star: {
          type: Number
        },
        quality: {
          type: Boolean
        },
        alreadyZzz: {
          type: Boolean
        },
        reviewId: {
          type: String
        },
        menu: {
          type: String
        },
        did: {
          type: Number
        },
        dealEndtime: {
          type: String
        },
        anonymous: {
          type: Boolean
        },
        poiId: {
          type: String
        }
      }
    ],
    tags: [
      {
        count: {
          type: Number
        },
        tag: {
          type: String
        }
      }
    ],
    city: {
      type: String
    }
  },
  {
    collection: 'scene',
    versionKey: false
  }
)

module.exports = mongoose.model('Scene', sceneSchema)
