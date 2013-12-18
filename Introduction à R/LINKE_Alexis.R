install.packages("gplots") 
library("gplots")

data = read.table("data.txt", header=TRUE, sep=",")

averageTime = function(data, technique) {
	sub=subset(data,Technique==technique)
	at=mean(sub[,"Time"]);
	return(at);
}

confidenceInterval = function(data, technique) {
	sub=subset(data,Technique==technique)$Time
	standardDeviation = sd(sub)
	n = sqrt(length(sub))
	ci = 1.96*(standardDeviation/n)
	return(ci)
}

techniques = c("SemPoint","Control","SurfPad") # data
techniquesAverageTime = sapply(techniques, averageTime, data=subset(data, Err==0))
techniquesConfidenceInterval = sapply(techniques, confidenceInterval, data=subset(data, Err==0))

barplot2(techniquesAverageTime, plot.ci=TRUE, col = c("blue", "red", "green"),	
	ci.l= techniquesAverageTime - techniquesConfidenceInterval, ci.u= techniquesAverageTime + techniquesConfidenceInterval, ylim = c(0,3.5), 	
	xlab="Techniques", 	ylab="Average Time")									