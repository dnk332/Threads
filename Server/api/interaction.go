package api

import (
	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/token"
	"github.com/gin-gonic/gin"
)

type Interaction struct {
	LikeStatus bool `json:"like_status"`
	CountLikes int  `json:"count_likes"`
	// CountReport int `json:"count_report"`
	// CountReply  int `json:"count_reply"`
}

func (server *Server) getInteractionOfPost(ctx *gin.Context, postId int64) Interaction {
	countLikes := server.countLikeOfPost(ctx, postId)
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	likeStatus := server.checkLikeStatusOfUser(ctx, db.CheckLikeStatusOfUserParams{
		PostID:   postId,
		AuthorID: authPayload.UserID,
	})

	rsp := Interaction{
		LikeStatus: likeStatus,
		CountLikes: int(countLikes),
	}

	return rsp
}
