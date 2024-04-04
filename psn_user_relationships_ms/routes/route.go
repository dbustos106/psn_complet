package routes

import (
	"PSN_Projct/controllers"

	"github.com/gin-gonic/gin"
)

func Route(router *gin.Engine) {

	controlers := controllers.NewHandlerUR()

	groupRoute := router.Group("/psn_ur")
	groupRoute.POST("/create", controlers.CreateUserC)
	groupRoute.POST("/follow", controlers.FollowUserC)
	groupRoute.POST("/search", controlers.SearchUserC)
	groupRoute.POST("/block", controlers.BlockUserC)
	groupRoute.PUT("/unfollow", controlers.UnfollowUserC)
	groupRoute.PUT("/unblock", controlers.UnblockUserC)
	groupRoute.PUT("/afollow", controlers.AcceptfollowUserC)
	groupRoute.PUT("/dfollow", controlers.DenyfollowUserC)
	groupRoute.GET("/is-blocked", controlers.IsBlockedUserC)
	groupRoute.GET("/relations", controlers.RelationsToUserC)
	groupRoute.GET("/followed", controlers.ListFollowedUserC)
	groupRoute.GET("/blocked", controlers.ListBlockedUserC)
	groupRoute.GET("/requests", controlers.ListRequestFollowUserC)
	groupRoute.GET("/suggested", controlers.ListSuggestedFriendsC)
	groupRoute.GET("/recent-searched", controlers.ListSearchedUserC)
	groupRoute.DELETE("/recent-searched", controlers.DeleteSearchUserC)
	groupRoute.DELETE("/delete", controlers.DeleteUserC)

}
