<template>
  <div class="profileWrapper">
    <div class="shortInfo">
      <h4>
        {{ $store.state.user.info.first_name }}
        {{ $store.state.user.info.last_name }}
      </h4>
      <p id="totalTweets">3 Tweets</p>
    </div>
    <div class="profile">
      <div class="background">
        <img
          src="https://www.rccaraction.com/wp-content/uploads/2014/04/600-x-200-banner.jpg"
          alt=""
        />
      </div>
      <div class="profileInfoWrapper">
        <div class="profileInfo">
          <div class="profileImage">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              alt=""
            />
          </div>
          <div class="profileName">
            <div class="row">
              <h4>
                {{ $store.state.user.info.first_name }}
                {{ $store.state.user.info.last_name }}
              </h4>
              <button @click="editProfile">Edit Profile</button>
            </div>
            <p id="username">@{{ $store.state.user.info.username }}</p>
            <p v-if="$store.state.user.info.bio === null">Biography</p>
            <p v-else>{{ $store.state.user.info.bio }}</p>
          </div>
          <div class="infoFollower">
            <div class="info">
              <span id="following" @click="showFollowingUsers"
                >{{ user.info.totalFollowing }} Following</span
              >

              <span id="followers" @click="showFollowerUsers"
                >{{ user.info.totalFollowers }} Followers</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tweets">
      <div class="wrapperTweet">
        <Tweet
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          v-on:removeTweet="removeTweet"
        />
      </div>
    </div>
  </div>
</template>

<script>
import backendApiConnection from '../../api/backendApiConnection'
export default {
  data() {
    return {
      tweets: [],
      paramsRoute: this.$route.params,
      user: {
        info: {
          id: '',
          first_name: '',
          last_name: '',
          username: '',
          biography: '',
          email: '',
          password: '',
          followers: [],
          totalFollowers: 0,
          following: [],
          totalFollowing: 0,
          tweets: [],
        },
      },
    }
  },
  created() {
    this.getFollowings()
    this.getFollowers()
    this.getTweets()
  },
  methods: {
    async getFollowings() {
      const response = await backendApiConnection.get(
        'followers/getFollowing/' + this.$store.state.user.info.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.user.info.following = response.data
        this.user.info.totalFollowing = response.data.length
      }
    },
    async getFollowers() {
      const response = await backendApiConnection.get(
        'followers/getFollowers/' + this.$store.state.user.info.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.user.info.followers = response.data
        this.user.info.totalFollowers = response.data.length
      }
    },
    async getTweets() {
      const response = await backendApiConnection.get(
        'tweet/getAllUserTweets/' + this.$store.state.user.info.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.tweets = response.data
      }
    },
    async removeTweet(tweetId) {
      this.tweets = this.tweets.filter((x) => x.id !== tweetId)
    },
    editProfile() {
      this.$swal
        .fire({
          title: 'Edit Profile',
          html: `<input type="text" id="first_name" class="swal2-input" placeholder="First Name" value="${this.$store.state.user.info.first_name}"><input type="text" id="last_name" class="swal2-input" placeholder="Last Name" value="${this.$store.state.user.info.last_name}">
  <input type="text" id="bio" class="swal2-input" placeholder="Biography" value="${this.$store.state.user.info.bio}"> <input type="date" id="dob" class="swal2-input" placeholder="Date of Birthday" value="${this.$store.state.user.info.dob}">`,
          confirmButtonText: 'Update Profile',
          focusConfirm: false,
          preConfirm: () => {
            const first_name = this.$swal
              .getPopup()
              .querySelector('#first_name').value
            const last_name = this.$swal
              .getPopup()
              .querySelector('#last_name').value
            const bio = this.$swal.getPopup().querySelector('#bio').value
            const dob = this.$swal.getPopup().querySelector('#dob').value
            if (!first_name || !last_name || !bio || !dob) {
              this.$swal.showValidationMessage('Please fill in all the fields')
            } else if (
              dob > new Date().toISOString().split('T')[0] ||
              dob < '1900-01-01'
            ) {
              this.$swal.showValidationMessage('Please enter a valid date')
            } else {
              return {
                first_name,
                last_name,
                bio,
                dob,
              }
            }
          },
        })
        .then(async (result) => {
          const response = await backendApiConnection.put(
            'user/updateUser/' + this.$store.state.user.info.id,
            {
              first_name: result.value.first_name,
              last_name: result.value.last_name,
              bio: result.value.bio,
              dob: result.value.dob,
            },
            {
              headers: {
                'x-auth-token': this.$store.state.user.token,
              },
            }
          )
          if (response.status === 200) {
            this.user.info.first_name = result.value.first_name
            this.user.info.last_name = result.value.last_name
            this.user.info.bio = result.value.bio
            this.user.info.dob = result.value.dob
            this.$store.commit('user/updateUser', {
              first_name: result.value.first_name,
              last_name: result.value.last_name,
              bio: result.value.bio,
              dob: result.value.dob,
            })
            this.$swal.fire({
              title: 'Profile Updated',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
          }
        })
    },
    async unfollow(id) {
      try {
        await backendApiConnection.post(
          '/followers/unfollowUser/' +
            id +
            '/' +
            this.$store.state.user.info.id,
          {},
          {
            headers: {
              'x-auth-token': this.$store.state.user.token,
            },
          }
        )
        this.following = false
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.response.data.message,
        })
      }
    },
    async showFollowingUsers() {
      this.$swal({
        title: 'Following',
        html:
          ' <div class="wrapperUsers">' +
          this.user.info.following
            .map(
              (x) =>
                `<div class="user">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        alt="" class="followingUserImage"
        style="width: 25%;"
      />

    <div class="dataUser">
      <p>${x.user.first_name} ${x.user.last_name}</p>
      <p>@${x.user.username}</p>
    </div>


    <button v-if="following">Unfollow</button>
      </div>
  `
            )
            .join('') +
          '</div>',
        showConfirmButton: false,
        showCloseButton: true,
      })
      console.log(this.user.info.followers)
    },
    async showFollowerUsers() {
      this.$swal({
        title: 'Following',
        html:
          ' <div class="wrapperUsers">' +
          this.user.info.followers
            .map(
              (x) =>
                `<div class="user">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        alt="" class="followingUserImage"
        style="width: 25%;"
      />

    <div class="dataUser">
      <p>${x.user.first_name} ${x.user.last_name}</p>
      <p>@${x.user.username}</p>
    </div>


    <button v-if="following">Unfollow</button>
      </div>
  `
            )
            .join('') +
          '</div>',
        showConfirmButton: false,
        showCloseButton: true,
      })
      console.log(this.user.info.followers)
    },
  },
}
</script>

<style scoped>
.profileWrapper {
  flex-grow: 15;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.shortInfo {
  background: #fff;
  border: 1px solid gray;
}

.shortInfo > h4 {
  margin: 1em 1.33em;
}

.shortInfo > #totalTweets {
  margin: 1em 1.33em;
  color: gray;
}

.background img {
  width: 100%;
  height: 150px;
}

.profileInfoWrapper {
  background: #fff;
  margin-top: -70px;
  border-bottom: 1px solid black;
}

.row {
  display: flex;
  justify-content: space-between;
}

.profileInfo {
  width: 95%;
  margin: 0 auto;
}

.profileInfo img {
  width: 100px;
  border-radius: 50%;
}

.profileInfo h4 {
  margin: 0;
}

.profileInfo #username {
  color: gray;
  margin-top: 5px;
}

.info {
  display: inline-block;
  width: 100%;
}

.info span:last-child {
  margin-left: 20px;
}

.tweets {
  background: #fff;
}

#dob {
  width: 80% !important;
}

#following:hover {
  cursor: pointer;
}

#followers:hover {
  cursor: pointer;
}
</style>
