const collection = {
  insertOne: () => { },
  find: () => { },
  delete: () => { },
  update: () => { },
  upsert: () => { },
}

const db = {
  jonas: collection,
  posts: collection,
  users: collection,
}


/***************************** User *****************************/

db.users.drop()
db.posts.drop()

// Create
var user = db.users.insertOne(
  {
    "name": "Jonas",
    "document": "0123456789",
    "birthdate": new Date("1991-05-24T00:00:00Z000"),
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "deleted": false,
  }
)

// Find
db.users.find(
  {
    _id: user.insertedId
  }
)

// Delete
db.users.updateOne(
  {
    _id: user.insertedId
  },
  {
    $set: {
      "deleted": true,
      "updatedAt": new Date()
    }
  }
)

// Update
db.users.updateOne(
  {
    _id: user.insertedId
  },
  {
    $set: {
      "name": "New Jonas",
      "document": "9876543210",
      "birthdate": new Date("1990-01-01T00:00:00Z000"),
      "updatedAt": new Date()
    }
    // },
    // $currentDate: {
    //   lastModified: true,
    //   "updatedAt": { $type: "timestamp"}
    // }
  }
)


/***************************** Post *****************************/

// Create
var post = db.posts.insertOne(
  {
    "title": "Post inicial",
    "short_description": "Este é o meu primeiro post criado!",
    "content": "Olá pessoal!\nGostaria apenas de dizer que este é meu primeiro post de muitos.\n\nAbraços!",
    "author": user.insertedId,
    "reactions": [],
    "comments": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "deleted": false,
  }
)

// Find
db.posts.find(
  {
    _id: post.insertedId
  }
)

// Delete
db.posts.updateOne(
  {
    _id: post.insertedId
  },
  {
    $set: {
      "deleted": true,
      "updatedAt": new Date()
    }
  }
)

// Update many
db.posts.updateMany(
  {
    _id: post.insertedId
  },
  {
    $set: {
      "updatedAt": "$NOW"
    }
  }
)

// Update
db.posts.updateOne(
  {
    _id: post.insertedId
  },
  {
    $set: {
      "title": "Post alterado",
      "short_description": "Este é o meu primeiro post editado!",
      "content": "Olá pessoal!\nGostaria apenas de dizer que este é meu primeiro post editado de muitos.\n\nAbraços!",
    }
  }
)


/***************************** Reaction *****************************/

// Create
db.posts.update(
  {
    _id: post.insertedId
  },
  {
    $push: {
      "reactions": {
        _id: new ObjectId(),
        "type": "loved",
        "author": user.insertedId,
        "createdAt": new Date()
      }
    }
  }
)

// Find
//// Find by post ID and reaction author ID
var reaction = db.posts.find(
  {
    _id: post.insertedId
  },
  {
    "reactions": {
      $elemMatch: {
        author: user.insertedId
      }
    },
    _id: 0
  }
)[0].reactions[0]

//// Find by reaction ID
var reaction = db.posts.find(
  {},
  {
    "reactions": {
      $elemMatch: {
        _id: reaction._id
      }
    }
  }
)[0].reactions[0]

// Update
db.posts.findOneAndUpdate(
  {
    _id: post.insertedId
  },
  {
    $set: {
      "reactions.$[elem].type": "loved",
      "reactions.$[elem].author": user.insertedId,
      "reactions.$[elem].createdAt": new Date()
    },
    $setOnInsert: {
      "reactions": []
    }
  },
  {
    arrayFilters: [
      {
        "elem.author": user.insertedId
      }
    ],
    upsert: true
  }
)

// Delete
db.posts.update(
  {
    _id: post.insertedId
  }, 
  {
    $pull: {
      "reactions": {
        "author": user.insertedId
      }
    }
  },
  {
    multi: false
  }
)


/***************************** Comment *****************************/

// Create
db.posts.update(
  {
    _id: post.insertedId
  },
  {
    $push: {
      "comments": {
        _id: new ObjectId(),
        "author": user.insertedId,
        "content": "My first comment!!!",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "deleted": false,
      }
    }
  }
)