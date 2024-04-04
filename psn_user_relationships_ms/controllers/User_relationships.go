package controllers

import (
	"PSN_Projct/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type handler struct {
	utu models.User_to_user
}

func NewHandlerUR() *handler {
	return &handler{}
}

func (u *handler) CreateUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.CreateUser(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) DeleteUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.DeleteUser(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) RelationsToUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.RelationsToUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) IsBlockedUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.IsBlockedUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) FollowUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.FollowUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) UnfollowUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.UnfollowUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) BlockUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.BlockUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) UnblockUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.UnblockUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) DenyfollowUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.DenyFollowUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) AcceptfollowUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.AcceptFollowUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) SearchUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.SearchUser(ctx, input.Id_origin, input.Id_destiny)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) DeleteSearchUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.DeleteSearchedUsersRecently(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) ListFollowedUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.ListFollowedUser(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) ListBlockedUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.ListBlockUser(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) ListSuggestedFriendsC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.ListSuggestedFriends(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) ListRequestFollowUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.ListRequestFollowUser(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}

func (u *handler) ListSearchedUserC(ctx *gin.Context) {
	var input models.User_to_user
	err := ctx.ShouldBindJSON(&input)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		result, err := u.utu.ListSearchedUsers(ctx, input.Id_origin)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, result)
		return
	}
}