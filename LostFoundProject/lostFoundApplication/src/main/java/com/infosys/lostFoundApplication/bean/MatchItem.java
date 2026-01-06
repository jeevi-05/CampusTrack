package com.infosys.lostFoundApplication.bean;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class MatchItem {
	@EmbeddedId
	private MatchItemId matchItemId;
	private String itemName;
	private String category;
	private String lostUsername;
	private String foundUsername;
	public MatchItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MatchItemId getMatchItemId() {
		return matchItemId;
	}
	public void setMatchItemId(MatchItemId matchItemId) {
		this.matchItemId = matchItemId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getLostUsername() {
		return lostUsername;
	}
	public void setLostUsername(String lostUsername) {
		this.lostUsername = lostUsername;
	}
	public String getFoundUsername() {
		return foundUsername;
	}
	public void setFoundUsername(String foundUsername) {
		this.foundUsername = foundUsername;
	}
	public MatchItem(MatchItemId matchItemId, String itemName, String category, String lostUsername,
			String foundUsername) {
		super();
		this.matchItemId = matchItemId;
		this.itemName = itemName;
		this.category = category;
		this.lostUsername = lostUsername;
		this.foundUsername = foundUsername;
	}
	public MatchItem(MatchItemDTO matchItemDTO) {
		super();
		this.matchItemId=new MatchItemId(matchItemDTO.getLostItemId(), matchItemDTO.getFoundItemId());
		this.itemName=matchItemDTO.getItemName();
		this.category=matchItemDTO.getCategory();
		this.lostUsername=matchItemDTO.getLostUsername();
		this.foundUsername=matchItemDTO.getFoundUsername();
	}
	

}
